export type AnimalId =
  | 'kucing'
  | 'anjing'
  | 'bebek'
  | 'sapi'
  | 'ayam'
  | 'domba'
  | 'katak'
  | 'singa'
  | 'gajah'
  | 'burung_hantu'
  | 'lebah'
  | 'lumba_lumba';

export type GradeTier = '1-2' | '3-4' | '5-6';

export interface AnimalItem {
  id: AnimalId;
  name: string;
  soundText: string;
  diet: 'Herbivora' | 'Karnivora' | 'Omnivora';
  habitat: string;
  reproduction: 'Vivipar' | 'Ovipar';
  vertebrate: 'Vertebrata' | 'Avertebrata';
  clueEasy: string;
  clueMedium: string;
  clueHard: string;
  scienceFact: string;
  accentBg: string;
  accentBorder: string;
}

export const ANIMALS: AnimalItem[] = [
  {
    id: 'kucing',
    name: 'Kucing',
    soundText: 'Meong!',
    diet: 'Karnivora',
    habitat: 'Lingkungan Rumah',
    reproduction: 'Vivipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Hewan berbulu halus yang suka mengeong',
    clueMedium: 'Mamalia lincah pemakan daging/ikan, berkumis sensitif untuk meraba',
    clueHard: 'Vertebrata vivipar dengan pupil mata yang cepat menyesuaikan cahaya redup',
    scienceFact: 'Kumis kucing membantu mengukur lebar celah sebelum melompat.',
    accentBg: '#FEF3C7',
    accentBorder: '#F59E0B',
  },
  {
    id: 'anjing',
    name: 'Anjing',
    soundText: 'Guk guk!',
    diet: 'Omnivora',
    habitat: 'Lingkungan Rumah',
    reproduction: 'Vivipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Hewan setia yang suka menggonggong',
    clueMedium: 'Mamalia dengan penciuman sangat tajam, menjaga rumah dengan menggonggong',
    clueHard: 'Mamalia vivipar berindera penciuman ribuan kali lebih peka dari manusia',
    scienceFact: 'Anjing mendinginkan tubuhnya dengan menjulurkan lidah dan terengah-engah.',
    accentBg: '#E0F2FE',
    accentBorder: '#0284C7',
  },
  {
    id: 'bebek',
    name: 'Bebek',
    soundText: 'Kwek kwek!',
    diet: 'Omnivora',
    habitat: 'Perairan & Kolam',
    reproduction: 'Ovipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Unggas berkaki selaput yang suka berenang',
    clueMedium: 'Unggas berparuh sudu dan berkaki berselaput untuk berenang di lumpur',
    clueHard: 'Aves ovipar dengan kelenjar minyak di bulu agar tubuhnya tetap kedap air',
    scienceFact: 'Kaki berselaput bebek berfungsi seperti dayung saat berenang di air.',
    accentBg: '#FEF9C3',
    accentBorder: '#EAB308',
  },
  {
    id: 'sapi',
    name: 'Sapi',
    soundText: 'Mooo!',
    diet: 'Herbivora',
    habitat: 'Padang Rumput',
    reproduction: 'Vivipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Hewan ternak pemakan rumput penghasil susu',
    clueMedium: 'Herbivora besar pemakan rumput yang hidup di padang rumput & peternakan',
    clueHard: 'Mamalia ruminansia (memamah biak) dengan lambung beruang empat',
    scienceFact: 'Sapi memiliki 4 bagian lambung untuk mencerna serat rumput dengan sempurna.',
    accentBg: '#FCE7F3',
    accentBorder: '#EC4899',
  },
  {
    id: 'ayam',
    name: 'Ayam',
    soundText: 'Kukuruyuk!',
    diet: 'Omnivora',
    habitat: 'Peternakan',
    reproduction: 'Ovipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Unggas berjengger merah yang berkokok pagi',
    clueMedium: 'Unggas pemakan biji dan serangga, jantannya berkokok saat fajar',
    clueHard: 'Vertebrata ovipar dengan paruh pendek runcing dan cakar pengais tanah',
    scienceFact: 'Ayam memiliki tembolok untuk menyimpan sementara biji-bijian sebelum dicerna.',
    accentBg: '#FFEDD5',
    accentBorder: '#F97316',
  },
  {
    id: 'domba',
    name: 'Domba',
    soundText: 'Mbek!',
    diet: 'Herbivora',
    habitat: 'Padang Rumput',
    reproduction: 'Vivipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Hewan berbulu wol tebal dan lembut',
    clueMedium: 'Herbivora berbulu wol tebal yang dimanfaatkan untuk bahan kain hangat',
    clueHard: 'Mamalia herbivora vivipar dengan adaptasi rambut wol penahan suhu dingin',
    scienceFact: 'Pupil mata domba berbentuk persegi panjang sehingga pandangannya sangat luas.',
    accentBg: '#EDE9FE',
    accentBorder: '#8B5CF6',
  },
  {
    id: 'katak',
    name: 'Katak',
    soundText: 'Krok krok!',
    diet: 'Karnivora',
    habitat: 'Rawa & Kolam',
    reproduction: 'Ovipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Hewan hijau pelompat di dekat kolam',
    clueMedium: 'Amfibi yang hidup di dua alam dan menangkap serangga dengan lidah lengket',
    clueHard: 'Amfibi bermetamorfosis sempurna, bernapas dengan paru-paru dan kulit lembap',
    scienceFact: 'Katak dewasa dapat menyerap oksigen melalui kulitnya yang selalu basah.',
    accentBg: '#DCFCE7',
    accentBorder: '#16A34A',
  },
  {
    id: 'singa',
    name: 'Singa',
    soundText: 'Aum!',
    diet: 'Karnivora',
    habitat: 'Sabana',
    reproduction: 'Vivipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Raja hutan berambut surai yang mengaum',
    clueMedium: 'Karnivora buas pemangsa utama di padang sabana yang hidup berkelompok',
    clueHard: 'Konsumen puncak (predator) bertaring tajam dan bersurai di ekosistem sabana',
    scienceFact: 'Auman singa dapat terdengar hingga jarak sekitar 8 kilometer di sabana.',
    accentBg: '#FEE2E2',
    accentBorder: '#EF4444',
  },
  {
    id: 'gajah',
    name: 'Gajah',
    soundText: 'Preeet!',
    diet: 'Herbivora',
    habitat: 'Hutan & Sabana',
    reproduction: 'Vivipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Hewan darat raksasa berbelalai panjang',
    clueMedium: 'Herbivora terbesar di darat yang memakai belalai untuk minum & mengambil daun',
    clueHard: 'Mamalia vivipar berbelalai (modifikasi hidung) dan telinga lebar pelepas panas',
    scienceFact: 'Daun telinga gajah yang lebar membantu mendinginkan darah di cuaca terik.',
    accentBg: '#E2E8F0',
    accentBorder: '#64748B',
  },
  {
    id: 'burung_hantu',
    name: 'Burung Hantu',
    soundText: 'Hu-huu!',
    diet: 'Karnivora',
    habitat: 'Hutan Malam',
    reproduction: 'Ovipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Burung bermata besar yang aktif di malam hari',
    clueMedium: 'Burung pemangsa aktif malam hari (nokturnal) dengan leher lentur',
    clueHard: 'Aves nokturnal karnivora yang kepalanya mampu berputar hingga 270 derajat',
    scienceFact: 'Ujung bulu sayap burung hantu bergerigi halus agar terbang tanpa suara.',
    accentBg: '#F3E8FF',
    accentBorder: '#9333EA',
  },
  {
    id: 'lebah',
    name: 'Lebah',
    soundText: 'Bzzz!',
    diet: 'Herbivora',
    habitat: 'Taman Bunga',
    reproduction: 'Ovipar',
    vertebrate: 'Avertebrata',
    clueEasy: 'Serangga kecil penghasil madu manis',
    clueMedium: 'Serangga penghisap nektar yang membantu penyerbukan bunga',
    clueHard: 'Avertebrata berbuku-buku (serangga) bermutualisme membantu penyerbukan',
    scienceFact: 'Lebah berkomunikasi menunjukkan arah sumber nektar lewat tarian angka delapan.',
    accentBg: '#FEF08A',
    accentBorder: '#CA8A04',
  },
  {
    id: 'lumba_lumba',
    name: 'Lumba-lumba',
    soundText: 'Klik-klik!',
    diet: 'Karnivora',
    habitat: 'Lautan',
    reproduction: 'Vivipar',
    vertebrate: 'Vertebrata',
    clueEasy: 'Hewan laut cerdas yang suka melompat',
    clueMedium: 'Hewan laut cerdas pemakan ikan yang muncul ke permukaan untuk bernapas',
    clueHard: 'Mamalia laut vivipar bernapas dengan paru-paru dan memakai sonar ekolokasi',
    scienceFact: 'Lumba-lumba mengirim gelombang suara (ekolokasi) untuk mendeteksi mangsa di laut.',
    accentBg: '#CFFAFE',
    accentBorder: '#0891B2',
  },
];

export interface TierConfig {
  tier: GradeTier;
  label: string;
  subtitle: string;
  targetIds: AnimalId[];
  distractorIds: AnimalId[];
  timeLimitSec: number | null;
  maxLives: number | null;
}

export const TIER_CONFIGS: Record<GradeTier, TierConfig> = {
  '1-2': {
    tier: '1-2',
    label: 'Kelas 1–2 SD',
    subtitle: 'Cocokkan nama & suara hewan dengan gambarnya (ada 2 kartu pengecoh!)',
    targetIds: ['kucing', 'anjing', 'bebek', 'sapi', 'ayam', 'katak'],
    distractorIds: ['domba', 'singa'],
    timeLimitSec: null,
    maxLives: null,
  },
  '3-4': {
    tier: '3-4',
    label: 'Kelas 3–4 SD',
    subtitle: 'Pecahkan teka-teki habitat, jenis makanan & suara dalam 120 detik!',
    targetIds: ['sapi', 'singa', 'bebek', 'katak', 'gajah', 'lebah'],
    distractorIds: ['ayam', 'kucing'],
    timeLimitSec: 120,
    maxLives: 5,
  },
  '5-6': {
    tier: '5-6',
    label: 'Kelas 5–6 SD',
    subtitle: 'Tantangan IPA: Klasifikasi vertebrata, cara berkembang biak & adaptasi!',
    targetIds: ['lumba_lumba', 'burung_hantu', 'katak', 'lebah', 'gajah', 'singa', 'ayam', 'domba'],
    distractorIds: ['bebek', 'anjing'],
    timeLimitSec: 120,
    maxLives: 4,
  },
};
