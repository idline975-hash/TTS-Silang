import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Star,
  Check,
  Trophy,
  Lightbulb,
  Delete,
  ArrowRight,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  CROSSWORD_PACKS,
  type CrosswordEntry,
  type CrosswordPack,
  type GradeTier,
} from './data/crosswords';
import { soundEngine } from './utils/soundEngine';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

interface CellMeta {
  row: number;
  col: number;
  answer: string;
  number?: number;
  acrossEntryId?: string;
  downEntryId?: string;
}

function cellKey(r: number, c: number) {
  return `${r},${c}`;
}

export default function App() {
  const [packId, setPackId] = useState<string>(CROSSWORD_PACKS[0].id);
  const [filterTier, setFilterTier] = useState<'all' | GradeTier>('all');
  const [showPackModal, setShowPackModal] = useState(false);

  const [userLetters, setUserLetters] = useState<Record<string, string>>({});
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [completedPackIds, setCompletedPackIds] = useState<string[]>([]);
  const [activeEntryId, setActiveEntryId] = useState<string>(CROSSWORD_PACKS[0].entries[0].id);
  const [cursor, setCursor] = useState<{ row: number; col: number }>({
    row: CROSSWORD_PACKS[0].entries[0].row,
    col: CROSSWORD_PACKS[0].entries[0].col,
  });
  const [wrongCells, setWrongCells] = useState<Record<string, boolean>>({});
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [banner, setBanner] = useState<{
    type: 'info' | 'success' | 'retry';
    text: string;
    fact?: string;
  }>({
    type: 'info',
    text: CROSSWORD_PACKS[0].subtitle,
  });

  const level: CrosswordPack = useMemo(
    () => CROSSWORD_PACKS.find((p) => p.id === packId) || CROSSWORD_PACKS[0],
    [packId]
  );

  // Build cell lookup map for current crossword pack
  const cellMap = useMemo(() => {
    const map = new Map<string, CellMeta>();
    for (const entry of level.entries) {
      for (let i = 0; i < entry.word.length; i++) {
        const r = entry.direction === 'across' ? entry.row : entry.row + i;
        const c = entry.direction === 'across' ? entry.col + i : entry.col;
        const key = cellKey(r, c);
        const existing = map.get(key) || {
          row: r,
          col: c,
          answer: entry.word[i],
        };
        if (i === 0) {
          existing.number = entry.number;
        }
        if (entry.direction === 'across') existing.acrossEntryId = entry.id;
        else existing.downEntryId = entry.id;
        map.set(key, existing);
      }
    }
    return map;
  }, [level]);

  const activeEntry = useMemo(
    () => level.entries.find((e) => e.id === activeEntryId) || level.entries[0],
    [level, activeEntryId]
  );

  const activeCellSet = useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i < activeEntry.word.length; i++) {
      const r = activeEntry.direction === 'across' ? activeEntry.row : activeEntry.row + i;
      const c = activeEntry.direction === 'across' ? activeEntry.col + i : activeEntry.col;
      set.add(cellKey(r, c));
    }
    return set;
  }, [activeEntry]);

  const solvedCellSet = useMemo(() => {
    const set = new Set<string>();
    for (const entry of level.entries) {
      if (!solvedIds.includes(entry.id)) continue;
      for (let i = 0; i < entry.word.length; i++) {
        const r = entry.direction === 'across' ? entry.row : entry.row + i;
        const c = entry.direction === 'across' ? entry.col + i : entry.col;
        set.add(cellKey(r, c));
      }
    }
    return set;
  }, [level, solvedIds]);

  const getEntryCells = useCallback((entry: CrosswordEntry) => {
    const list: { row: number; col: number; expected: string }[] = [];
    for (let i = 0; i < entry.word.length; i++) {
      list.push({
        row: entry.direction === 'across' ? entry.row : entry.row + i,
        col: entry.direction === 'across' ? entry.col + i : entry.col,
        expected: entry.word[i],
      });
    }
    return list;
  }, []);

  const loadPack = useCallback((nextPackId: string) => {
    const nextPack = CROSSWORD_PACKS.find((p) => p.id === nextPackId) || CROSSWORD_PACKS[0];
    const first = nextPack.entries[0];
    setPackId(nextPack.id);
    setUserLetters({});
    setSolvedIds([]);
    setActiveEntryId(first.id);
    setCursor({ row: first.row, col: first.col });
    setWrongCells({});
    setHintsUsed(0);
    setScore(0);
    setShowVictory(false);
    setShowPackModal(false);
    setBanner({
      type: 'info',
      text: `${nextPack.title} (${nextPack.gradeLabel}) — ${nextPack.subtitle}`,
    });
  }, []);

  const selectEntry = useCallback(
    (entry: CrosswordEntry, lettersSnapshot?: Record<string, string>) => {
      const letters = lettersSnapshot || userLetters;
      setActiveEntryId(entry.id);
      const cells = getEntryCells(entry);
      const firstEmpty = cells.find((c) => !letters[cellKey(c.row, c.col)]);
      const target = firstEmpty || cells[0];
      setCursor({ row: target.row, col: target.col });
    },
    [getEntryCells, userLetters]
  );

  const stepEntry = (delta: number) => {
    const idx = level.entries.findIndex((e) => e.id === activeEntry.id);
    const nextIdx = (idx + delta + level.entries.length) % level.entries.length;
    selectEntry(level.entries[nextIdx]);
  };

  const checkSolvedEntries = useCallback(
    (nextLetters: Record<string, string>) => {
      const newlySolved: CrosswordEntry[] = [];
      const nextWrong: Record<string, boolean> = {};

      for (const entry of level.entries) {
        if (solvedIds.includes(entry.id)) continue;
        const cells = getEntryCells(entry);
        const allFilled = cells.every((c) => Boolean(nextLetters[cellKey(c.row, c.col)]));
        if (!allFilled) continue;

        const allCorrect = cells.every(
          (c) => nextLetters[cellKey(c.row, c.col)] === c.expected
        );

        if (allCorrect) {
          newlySolved.push(entry);
        } else {
          for (const c of cells) {
            const k = cellKey(c.row, c.col);
            if (!solvedCellSet.has(k) && nextLetters[k] !== c.expected) {
              nextWrong[k] = true;
            }
          }
        }
      }

      if (Object.keys(nextWrong).length > 0) {
        setWrongCells(nextWrong);
        soundEngine.playTryAgain();
        setBanner({
          type: 'retry',
          text: 'Ada huruf yang belum tepat (ditandai kuning). Perbaiki ya!',
        });
      } else {
        setWrongCells({});
      }

      if (newlySolved.length > 0) {
        const updatedSolved = [...solvedIds, ...newlySolved.map((e) => e.id)];
        const pointsGained = newlySolved.reduce((acc, e) => acc + e.word.length * 5, 0);
        setSolvedIds(updatedSolved);
        setScore((s) => s + pointsGained);

        const lastSolved = newlySolved[newlySolved.length - 1];
        soundEngine.playWordSolved();
        if (lastSolved.soundId) {
          window.setTimeout(() => soundEngine.playClueSound(lastSolved.soundId), 220);
        }

        setBanner({
          type: 'success',
          text: `Hebat! Kata "${lastSolved.word}" benar (+${pointsGained} poin).`,
          fact: lastSolved.fact,
        });

        if (updatedSolved.length === level.entries.length) {
          setCompletedPackIds((prev) =>
            prev.includes(level.id) ? prev : [...prev, level.id]
          );
          window.setTimeout(() => {
            soundEngine.playVictoryFanfare();
            setShowVictory(true);
          }, 650);
        } else if (updatedSolved.includes(activeEntry.id)) {
          const nextUnsolved = level.entries.find((e) => !updatedSolved.includes(e.id));
          if (nextUnsolved) {
            selectEntry(nextUnsolved, nextLetters);
          }
        }
      }
    },
    [level, solvedIds, getEntryCells, solvedCellSet, activeEntry.id, selectEntry]
  );

  const handleLetterInput = useCallback(
    (char: string) => {
      if (showVictory || showPackModal) return;
      const key = cellKey(cursor.row, cursor.col);
      if (!cellMap.has(key)) return;

      const upper = char.toUpperCase();
      let nextLetters = userLetters;

      if (!solvedCellSet.has(key)) {
        nextLetters = { ...userLetters, [key]: upper };
        setUserLetters(nextLetters);
        soundEngine.playKey();
      }

      const cells = getEntryCells(activeEntry);
      const idx = cells.findIndex((c) => c.row === cursor.row && c.col === cursor.col);
      if (idx !== -1) {
        let nextIdx = idx + 1;
        while (
          nextIdx < cells.length &&
          solvedCellSet.has(cellKey(cells[nextIdx].row, cells[nextIdx].col))
        ) {
          nextIdx++;
        }
        if (nextIdx < cells.length) {
          setCursor({ row: cells[nextIdx].row, col: cells[nextIdx].col });
        } else if (idx + 1 < cells.length) {
          setCursor({ row: cells[idx + 1].row, col: cells[idx + 1].col });
        }
      }

      if (nextLetters !== userLetters) {
        checkSolvedEntries(nextLetters);
      }
    },
    [
      showVictory,
      showPackModal,
      cursor,
      cellMap,
      userLetters,
      solvedCellSet,
      getEntryCells,
      activeEntry,
      checkSolvedEntries,
    ]
  );

  const handleBackspace = useCallback(() => {
    if (showVictory || showPackModal) return;
    const key = cellKey(cursor.row, cursor.col);
    const cells = getEntryCells(activeEntry);
    const idx = cells.findIndex((c) => c.row === cursor.row && c.col === cursor.col);

    if (userLetters[key] && !solvedCellSet.has(key)) {
      const nextLetters = { ...userLetters };
      delete nextLetters[key];
      setUserLetters(nextLetters);
      setWrongCells((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
      soundEngine.playErase();
      return;
    }

    if (idx > 0) {
      let prevIdx = idx - 1;
      while (
        prevIdx > 0 &&
        solvedCellSet.has(cellKey(cells[prevIdx].row, cells[prevIdx].col))
      ) {
        prevIdx--;
      }
      const target = cells[prevIdx];
      setCursor({ row: target.row, col: target.col });
      const prevKey = cellKey(target.row, target.col);
      if (userLetters[prevKey] && !solvedCellSet.has(prevKey)) {
        const nextLetters = { ...userLetters };
        delete nextLetters[prevKey];
        setUserLetters(nextLetters);
        soundEngine.playErase();
      }
    }
  }, [showVictory, showPackModal, cursor, getEntryCells, activeEntry, userLetters, solvedCellSet]);

  const handleHint = () => {
    if (showVictory) return;
    const cells = getEntryCells(activeEntry);
    const currentKey = cellKey(cursor.row, cursor.col);
    const targetCell =
      cells.find(
        (c) =>
          cellKey(c.row, c.col) === currentKey &&
          userLetters[currentKey] !== c.expected
      ) ||
      cells.find((c) => userLetters[cellKey(c.row, c.col)] !== c.expected);

    if (!targetCell) return;

    const tKey = cellKey(targetCell.row, targetCell.col);
    const nextLetters = { ...userLetters, [tKey]: targetCell.expected };
    setUserLetters(nextLetters);
    setHintsUsed((h) => h + 1);
    setCursor({ row: targetCell.row, col: targetCell.col });
    soundEngine.playKey();
    setBanner({
      type: 'info',
      text: `Bantuan digunakan: huruf "${targetCell.expected}" terbuka!`,
    });
    checkSolvedEntries(nextLetters);
  };

  const handleCellClick = (meta: CellMeta) => {
    const isSameCell = cursor.row === meta.row && cursor.col === meta.col;
    setCursor({ row: meta.row, col: meta.col });

    if (isSameCell && meta.acrossEntryId && meta.downEntryId) {
      const toggledId =
        activeEntryId === meta.acrossEntryId ? meta.downEntryId : meta.acrossEntryId;
      setActiveEntryId(toggledId);
      return;
    }

    if (
      activeEntryId === meta.acrossEntryId ||
      activeEntryId === meta.downEntryId
    ) {
      return;
    }

    if (meta.acrossEntryId && !solvedIds.includes(meta.acrossEntryId)) {
      setActiveEntryId(meta.acrossEntryId);
    } else if (meta.downEntryId && !solvedIds.includes(meta.downEntryId)) {
      setActiveEntryId(meta.downEntryId);
    } else if (meta.acrossEntryId) {
      setActiveEntryId(meta.acrossEntryId);
    } else if (meta.downEntryId) {
      setActiveEntryId(meta.downEntryId);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (showVictory || showPackModal) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleLetterInput(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleBackspace();
      } else if (
        e.key === 'ArrowRight' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown'
      ) {
        e.preventDefault();
        const dr = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        const dc = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        const nr = cursor.row + dr;
        const nc = cursor.col + dc;
        const neighbor = cellMap.get(cellKey(nr, nc));
        if (neighbor) {
          setCursor({ row: nr, col: nc });
          if (dr !== 0 && neighbor.downEntryId) setActiveEntryId(neighbor.downEntryId);
          if (dc !== 0 && neighbor.acrossEntryId) setActiveEntryId(neighbor.acrossEntryId);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showVictory, showPackModal, handleLetterInput, handleBackspace, cursor, cellMap]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    soundEngine.setMuted(next);
  };

  const acrossEntries = level.entries.filter((e) => e.direction === 'across');
  const downEntries = level.entries.filter((e) => e.direction === 'down');
  const earnedStars = hintsUsed <= 1 ? 3 : hintsUsed <= 3 ? 2 : 1;

  const currentPackIndex = CROSSWORD_PACKS.findIndex((p) => p.id === level.id);
  const nextPack =
    currentPackIndex >= 0 && currentPackIndex + 1 < CROSSWORD_PACKS.length
      ? CROSSWORD_PACKS[currentPackIndex + 1]
      : null;

  const visiblePacks =
    filterTier === 'all'
      ? CROSSWORD_PACKS
      : CROSSWORD_PACKS.filter((p) => p.tier === filterTier);

  const renderClueList = (title: string, items: CrosswordEntry[]) => (
    <div>
      <h3 className="font-display text-sm sm:text-base font-extrabold text-slate-800 mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {items.map((entry) => {
          const isSolved = solvedIds.includes(entry.id);
          const isActive = activeEntryId === entry.id;
          return (
            <div
              key={entry.id}
              onClick={() => selectEntry(entry)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectEntry(entry);
                }
              }}
              className={`rounded-xl px-3 py-2.5 border text-left transition-colors cursor-pointer flex items-start justify-between gap-2 ${
                isSolved
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : isActive
                    ? 'bg-sky-50 border-sky-500 text-slate-900'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="text-xs sm:text-sm leading-snug">
                <span className="font-extrabold mr-1.5 tabular-nums">{entry.number}.</span>
                <span className={isSolved ? 'font-semibold' : 'font-medium'}>
                  {entry.clue}
                </span>
                <span className="text-slate-500 font-semibold ml-1.5 tabular-nums">
                  ({entry.word.length} huruf)
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {entry.soundId && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playClueSound(entry.soundId);
                    }}
                    aria-label={`Dengar suara petunjuk ${entry.number}`}
                    className="w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center justify-center cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                {isSolved && (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F6FF] via-[#F5FAFD] to-[#ECFDF5] text-slate-900 flex flex-col">
      {/* Top Bar: 3 clean zones */}
      <header className="w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <h1 className="font-display text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            TTS Edukasi SD
          </h1>

          <div className="hidden md:flex items-center gap-3 text-sm font-semibold text-slate-600 tabular-nums whitespace-nowrap">
            <span>{level.gradeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Skor {score}</span>
            <span aria-hidden="true">·</span>
            <span>
              Kata {solvedIds.length} / {level.entries.length}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {muted ? (
                <VolumeX className="w-5 h-5 text-slate-500" />
              ) : (
                <Volume2 className="w-5 h-5 text-sky-600" />
              )}
              <span className="hidden sm:inline">{muted ? 'Mati' : 'Suara'}</span>
            </button>

            <button
              type="button"
              onClick={() => loadPack(level.id)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:translate-y-0.5 text-slate-950 font-display font-bold text-sm sm:text-base border-b-4 border-amber-600 flex items-center gap-2 transition-transform whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Ulangi</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-4">
        {/* Toolbar Pilihan Soal: Pilih Paket Soal & Pilih Nomor Soal Langsung */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 flex-1 min-w-0">
            <label
              htmlFor="pack-select"
              className="font-display font-bold text-sm text-slate-700 whitespace-nowrap shrink-0"
            >
              Pilih Paket Soal:
            </label>
            <select
              id="pack-select"
              value={level.id}
              onChange={(e) => loadPack(e.target.value)}
              className="min-h-[44px] flex-1 max-w-md rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900 focus:border-sky-500 focus:outline-none cursor-pointer"
            >
              {CROSSWORD_PACKS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.gradeLabel}) — {p.entries.length} Soal
                  {completedPackIds.includes(p.id) ? ' ✓' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2">
            <div className="flex md:hidden items-center gap-2 text-xs font-bold text-slate-600 tabular-nums">
              <span>Skor {score}</span>
              <span>·</span>
              <span>
                {solvedIds.length}/{level.entries.length} Kata
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowPackModal(true)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-display font-bold text-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lihat Semua Daftar Soal ({CROSSWORD_PACKS.length})</span>
            </button>
          </div>
        </div>

        {/* Dynamic Feedback & Science Fact */}
        <div
          role="status"
          aria-live="polite"
          className={`rounded-2xl px-4 py-3 border-2 transition-colors ${
            banner.type === 'success'
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : banner.type === 'retry'
                ? 'bg-amber-50 border-amber-400 text-amber-950'
                : 'bg-white border-sky-200 text-slate-800'
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                banner.type === 'success'
                  ? 'bg-emerald-500 text-white'
                  : banner.type === 'retry'
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-sky-100 text-sky-700'
              }`}
            >
              {banner.type === 'success' ? (
                <Check className="w-5 h-5 stroke-[3]" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </span>
            <div>
              <p className="text-sm sm:text-base font-bold leading-snug">{banner.text}</p>
              {banner.fact && (
                <p className="text-xs sm:text-sm font-medium text-emerald-800 mt-0.5">
                  Fakta Edukasi: {banner.fact}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Two-Column Crossword Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Zone: Active Clue + Grid + On-screen Keyboard */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Active Clue Bar with Prev/Next & Direct Question Selector */}
            <div className="bg-sky-600 text-white rounded-2xl p-3.5 sm:p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => stepEntry(-1)}
                    aria-label="Soal sebelumnya"
                    className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <select
                    aria-label="Pilih nomor soal"
                    value={activeEntry.id}
                    onChange={(e) => {
                      const found = level.entries.find((x) => x.id === e.target.value);
                      if (found) selectEntry(found);
                    }}
                    className="min-h-[36px] rounded-lg bg-white text-slate-900 font-display font-bold text-xs sm:text-sm px-2.5 py-1 cursor-pointer focus:outline-none"
                  >
                    {level.entries.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.number} {e.direction === 'across' ? 'Mendatar' : 'Menurun'} (
                        {e.word.length} huruf){solvedIds.includes(e.id) ? ' ✓' : ''}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => stepEntry(1)}
                    aria-label="Soal berikutnya"
                    className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeEntry.soundId && (
                    <button
                      type="button"
                      onClick={() => soundEngine.playClueSound(activeEntry.soundId)}
                      aria-label="Dengar suara hewan"
                      className="min-w-[40px] min-h-[40px] rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleHint}
                    className="min-h-[40px] px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>Bantu Huruf</span>
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base font-bold leading-snug">
                {activeEntry.clue}
              </p>
            </div>

            {/* Crossword Grid */}
            <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-5 flex justify-center">
              <div
                className="grid gap-1 sm:gap-1.5 w-full max-w-[520px]"
                style={{
                  gridTemplateColumns: `repeat(${level.cols}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: level.rows }).map((_, r) =>
                  Array.from({ length: level.cols }).map((__, c) => {
                    const key = cellKey(r, c);
                    const meta = cellMap.get(key);

                    if (!meta) {
                      return (
                        <div
                          key={key}
                          aria-hidden="true"
                          className="aspect-square rounded-lg bg-slate-800/12"
                        />
                      );
                    }

                    const isCursor = cursor.row === r && cursor.col === c;
                    const isInActiveWord = activeCellSet.has(key);
                    const isSolved = solvedCellSet.has(key);
                    const isWrong = Boolean(wrongCells[key]);
                    const letter = userLetters[key] || '';

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleCellClick(meta)}
                        aria-label={`Baris ${r + 1} Kolom ${c + 1}${
                          meta.number ? ` Nomor ${meta.number}` : ''
                        }`}
                        className={`relative aspect-square rounded-lg border-2 font-display font-extrabold text-base sm:text-xl flex items-center justify-center select-none transition-colors cursor-pointer focus:outline-none ${
                          isCursor
                            ? 'bg-amber-100 border-amber-500 text-slate-950 ring-2 ring-amber-300 z-10'
                            : isWrong
                              ? 'bg-amber-50 border-amber-400 text-amber-900'
                              : isSolved
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                                : isInActiveWord
                                  ? 'bg-sky-50 border-sky-400 text-slate-900'
                                  : 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
                        }`}
                      >
                        {meta.number !== undefined && (
                          <span className="absolute top-0.5 left-1 text-[9px] sm:text-[11px] font-bold leading-none text-slate-500 tabular-nums">
                            {meta.number}
                          </span>
                        )}
                        <span>{letter}</span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Kid-Friendly On-Screen Keyboard */}
            <div className="bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3 flex flex-col gap-1.5">
              {KEYBOARD_ROWS.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
                  {row.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleLetterInput(ch)}
                      className="flex-1 max-w-[44px] min-h-[44px] rounded-xl bg-slate-100 hover:bg-sky-100 active:bg-sky-200 active:translate-y-0.5 border border-slate-300 border-b-[3px] font-display font-extrabold text-sm sm:text-base text-slate-900 cursor-pointer"
                    >
                      {ch}
                    </button>
                  ))}
                  {rIdx === 2 && (
                    <button
                      type="button"
                      onClick={handleBackspace}
                      aria-label="Hapus huruf"
                      className="px-3 min-h-[44px] rounded-xl bg-rose-100 hover:bg-rose-200 active:translate-y-0.5 border border-rose-300 border-b-[3px] font-display font-bold text-xs sm:text-sm text-rose-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Delete className="w-4 h-4" />
                      <span className="hidden sm:inline">Hapus</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Zone: Clues Panel */}
          <aside className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 flex flex-col gap-5">
            {renderClueList('Mendatar', acrossEntries)}
            <div className="h-px bg-slate-200" />
            {renderClueList('Menurun', downEntries)}
          </aside>
        </div>
      </main>

      {/* Modal Daftar Pilihan Paket Soal */}
      {showPackModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pack-modal-title"
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl border-2 border-slate-200 max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-3">
              <div>
                <h2 id="pack-modal-title" className="font-display text-xl font-extrabold text-slate-900">
                  Daftar Pilihan Paket Soal TTS
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Pilih tingkat kelas atau tema soal teka-teki silang yang ingin dimainkan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPackModal(false)}
                aria-label="Tutup daftar soal"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tingkat Kelas */}
            <div className="px-5 pt-4 flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'Semua Kelas' },
                { key: '1-2', label: 'Kelas 1–2 SD' },
                { key: '3-4', label: 'Kelas 3–4 SD' },
                { key: '5-6', label: 'Kelas 5–6 SD' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilterTier(tab.key as 'all' | GradeTier)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-xl font-display font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                    filterTier === tab.key
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Daftar Kartu Paket Soal */}
            <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visiblePacks.map((p) => {
                const isCurrent = p.id === level.id;
                const isDone = completedPackIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => loadPack(p.id)}
                    className={`rounded-2xl p-4 border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isCurrent
                        ? 'bg-sky-50 border-sky-500'
                        : isDone
                          ? 'bg-emerald-50/60 border-emerald-300 hover:border-emerald-500'
                          : 'bg-white border-slate-200 hover:border-sky-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500 mb-1">
                        <span>
                          {p.gradeLabel} · {p.topic}
                        </span>
                        {isDone && (
                          <span className="text-emerald-700 font-extrabold inline-flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 stroke-[3]" /> Selesai
                          </span>
                        )}
                      </div>
                      <div className="font-display text-base font-extrabold text-slate-900">
                        {p.title}
                      </div>
                      <p className="text-xs font-medium text-slate-600 mt-1 leading-snug">
                        {p.subtitle}
                      </p>
                    </div>

                    <div className="text-xs font-extrabold text-sky-700 flex items-center justify-between pt-2 border-t border-slate-200/70">
                      <span>{p.entries.length} Kata Teka-Teki</span>
                      <span>{isCurrent ? 'Sedang Dimainkan' : 'Pilih Soal →'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Victory Modal */}
      {showVictory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl border-4 border-amber-300 max-w-md w-full p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mb-4">
              <Trophy className="w-11 h-11" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Teka-Teki Tuntas!
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base mb-5">
              Semua kata pada {level.title} ({level.gradeLabel}) berhasil kamu pecahkan!
            </p>

            <div
              className="flex items-center justify-center gap-3 mb-5"
              aria-label={`Mendapat ${earnedStars} dari 3 bintang`}
            >
              {[1, 2, 3].map((idx) => (
                <Star
                  key={idx}
                  className={`w-12 h-12 ${
                    idx <= earnedStars
                      ? 'text-amber-400 fill-amber-400 scale-110'
                      : 'text-slate-200 fill-slate-200'
                  }`}
                />
              ))}
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-2xl py-3 px-4 mb-6 flex items-center justify-around tabular-nums">
              <div>
                <div className="text-xs font-semibold text-slate-500">Skor</div>
                <div className="font-display text-2xl font-extrabold text-sky-700">{score}</div>
              </div>
              <div className="h-8 w-px bg-sky-200" />
              <div>
                <div className="text-xs font-semibold text-slate-500">Bantuan</div>
                <div className="font-display text-2xl font-extrabold text-slate-700">
                  {hintsUsed}
                </div>
              </div>
              <div className="h-8 w-px bg-sky-200" />
              <div>
                <div className="text-xs font-semibold text-slate-500">Bintang</div>
                <div className="font-display text-2xl font-extrabold text-amber-600">
                  {earnedStars}/3
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {nextPack && (
                <button
                  type="button"
                  onClick={() => loadPack(nextPack.id)}
                  className="w-full min-h-[52px] px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-display font-extrabold text-base sm:text-lg border-b-4 border-sky-800 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lanjut: {nextPack.title}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowVictory(false);
                  setShowPackModal(true);
                }}
                className="w-full min-h-[48px] px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Pilih Paket Soal Lain</span>
              </button>

              <button
                type="button"
                onClick={() => loadPack(level.id)}
                className="w-full min-h-[52px] px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-display font-extrabold text-base sm:text-lg border-b-4 border-emerald-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Main Lagi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
