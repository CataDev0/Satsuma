export interface LookupResponse {
  kjoretoy: Kjoretoy;
  bruksforbud: boolean;
  antallTreff: number;
}

interface Kjoretoy {
  kjoretoyId: KjoretoyId;
  forstegangsregistrering: Forstegangsregistrering;
  eierskap: Eierskap;
  kjennemerke: Kjennemerke[];
  registrering: Registrering;
  bruksforbud: any[];
  godkjenning: Godkjenning;
  periodiskKjoretoyKontroll: PeriodiskKjoretoyKontroll;
}

interface PeriodiskKjoretoyKontroll {
  kontrollfrist: string;
  sistGodkjent: string;
}

interface Godkjenning {
  forstegangsGodkjenning: ForstegangsGodkjenning;
  kjoretoymerknad: any[];
  registreringsbegrensninger: Registreringsbegrensninger;
  tekniskGodkjenning: TekniskGodkjenning;
  tilleggsgodkjenninger: any[];
}

interface TekniskGodkjenning {
  godkjenningsId: string;
  godkjenningsundertype: Godkjenningsundertype;
  gyldigFraDato: string;
  gyldigFraDatoTid: string;
  kjoretoyklassifisering: Kjoretoyklassifisering;
  korreksjon: null;
  krav: any[];
  tekniskeData: TekniskeData;
  unntak: any[];
}

interface TekniskeData {
  akslinger: Akslinger;
  bremser: Bremser;
  dekkOgFelg: DekkOgFelg;
  dimensjoner: Dimensjoner;
  generelt: Generelt;
  karosseriOgLasteplan: KarosseriOgLasteplan;
  miljodata: Miljodata;
  motorOgDrivverk: MotorOgDrivverk;
  ovrigeTekniskeData: OvrigeTekniskeDatum[];
  persontall: Persontall;
  tilhengerkopling: Tilhengerkopling;
  vekter: Vekter;
}

interface Vekter {
  egenvekt: number;
  egenvektMaksimum: null;
  egenvektMinimum: null;
  egenvektTilhengerkopling: null;
  frontOgHjulVekter: null;
  nyttelast: number;
  tekniskTillattForhoyetTotalvekt: null;
  tekniskTillattTotalvekt: null;
  tekniskTillattTotalvektVeg: null;
  tekniskTillattVektPahengsvogn: null;
  tekniskTillattVektSemitilhenger: null;
  tillattHjulLastSidevogn: null;
  tillattTaklast: null;
  tillattTilhengervektMedBrems: number;
  tillattTilhengervektUtenBrems: number;
  tillattTotalvekt: number;
  tillattVektSlepevogn: null;
  tillattVertikalKoplingslast: null;
  tillattVogntogvekt: null;
  tillattVogntogvektVeg: null;
  vogntogvektAvhBremsesystem: any[];
}

interface Tilhengerkopling {
  kopling: any[];
}

interface Persontall {
  bareplasser: null;
  rullestolplasser: null;
  sitteplassListe: null;
  sitteplasserForan: number;
  sitteplasserNede: null;
  sitteplasserOppe: null;
  sitteplasserStillstand: null;
  sitteplasserTotalt: number;
  sitteplasserTotaltSomVarebilKlasse2: null;
  staplasser: null;
}

interface OvrigeTekniskeDatum {
  datafeltIndeks: null;
  datafeltNavn: string;
  datafeltVerdi: string;
}

interface MotorOgDrivverk {
  antallGir: null;
  antallGirBakover: null;
  effektKraftuttakKW: null;
  girPlassering: null;
  girkassetype: null;
  giroverforingsType: null;
  girutvekslingPrGir: any[];
  hybridElektriskKjoretoy: null;
  hybridKategori: KjennemerketypeBak;
  maksimumHastighet: any[];
  maksimumHastighetMalt: any[];
  motor: Motor[];
  obd: null;
  totalUtvekslingHoyesteGir: null;
  utelukkendeElektriskDrift: null;
}

interface Motor {
  antallSylindre: null;
  arbeidsprinsipp: null;
  avgassResirkulering: null;
  blandingsDrivstoff: null;
  drivstoff: Drivstoff[];
  fabrikant: null;
  fordampningsutslippKontrollSystem: null;
  katalysator: null;
  kjolesystem: null;
  ladeluftkjoler: null;
  luftInnsproytning: null;
  motorKode: null;
  motorNummer: null;
  oksygenSensor: null;
  overladet: null;
  partikkelfilterMotor: null;
  slagvolum: number;
  sylinderArrangement: null;
}

interface Drivstoff {
  drivstoffKode: KjennemerketypeBak;
  effektVektForhold: null;
  maksEffektPrTime: null;
  maksNettoEffekt: null;
  maksNettoEffektVedOmdreiningstallMin1: null;
  maksNettoEffektVedOmdreiningstallMin1Maks: null;
  maksOmdreining: null;
  spenning: null;
  tomgangsOmdreiningstall: null;
}

interface Miljodata {
  co2BesparelsePgaOkoInnovasjon: null;
  euroKlasse: KjennemerketypeBak;
  lyddemperUtblas: null;
  miljoOgdrivstoffGruppe: MiljoOgdrivstoffGruppe[];
  okoInnovasjon: null;
  typeOkoInnovasjon: null;
}

interface MiljoOgdrivstoffGruppe {
  drivstoffKodeMiljodata: KjennemerketypeBak;
  forbrukOgUtslipp: null;
  lyd: Lyd;
}

interface Lyd {
  innvendigStoyniva: null;
  kjorestoy: null;
  standstoy: null;
  stoyMalingOppgittAv: null;
  vedAntallOmdreininger: null;
}

interface KarosseriOgLasteplan {
  antallDorer: any[];
  avstandNavSkjermbueBak: null;
  avstandNavSkjermbueForan: null;
  bussKategori: null;
  dorUtforming: any[];
  fargeFjar: null;
  forankringSikkerhetsseler: null;
  forervern: null;
  forervernBoyle: null;
  godkjentADR: null;
  hydrauliskLoft: null;
  karosseriArt: null;
  karosseritype: null;
  kjennemerketypeBak: KjennemerketypeBak;
  kjennemerkestorrelseBak: KjennemerketypeBak;
  kjennemerketypeForan: KjennemerketypeBak;
  kjennemerkestorrelseForan: KjennemerketypeBak;
  kjennemerketypeVenstre: null;
  kjennemerkestorrelseVenstre: null;
  kjoringSide: string;
  oppbygningUnderstellsnummer: null;
  overhengBak: null;
  pabyggsKode: null;
  passasjerHandtak: null;
  plasseringAvDorer: null;
  plasseringFabrikasjonsplate: any[];
  plasseringMerkeplateTrimming: null;
  plasseringUnderstellsnummer: any[];
  rFarge: RFarge[];
  sikkerhetsseler: null;
  styremekanismeArt: null;
  temperaturregulertSkap: null;
  vendbarForerplass: null;
}

interface RFarge {
  kodeBeskrivelse: null | string;
  kodeNavn: string;
  kodeTypeId: string;
  kodeVerdi: string;
  tidligereKodeVerdi: any[];
}

interface KjennemerketypeBak {
  kodeBeskrivelse: string;
  kodeNavn: string;
  kodeTypeId: string;
  kodeVerdi: string;
  tidligereKodeVerdi: any[];
}

interface Generelt {
  fabrikant: any[];
  ferdigbyggetEllerEndretSomFolger: null;
  handelsbetegnelse: string[];
  merke: Merke[];
  tekniskKode: Kjennemerketype;
  tekniskUnderkode: null;
  typebetegnelse: string;
  unntakFra: null;
}

interface Merke {
  merke: string;
  merkeKode: string;
}

interface Dimensjoner {
  bredde: number;
  hoyde: null;
  lengde: number;
  lengdeInnvendigLasteplan: null;
  maksimalBredde: null;
  maksimalHoyde: null;
  maksimalLengde: null;
  maksimalLengdeInnvendigLasteplan: null;
}

interface DekkOgFelg {
  akselDekkOgFelgKombinasjon: AkselDekkOgFelgKombinasjon[];
  dekkOgFelgSidevogn: null;
}

interface AkselDekkOgFelgKombinasjon {
  akselDekkOgFelg: AkselDekkOgFelg[];
  tillattTotalvektTraktor: null;
}

interface AkselDekkOgFelg {
  akselId: number;
  belastningskodeDekk: string;
  belastningskodeDekkTraktor: null;
  dekkdimensjon: string;
  felgdimensjon: null;
  hastighetskodeDekk: null;
  innpress: null;
  tillattAkselLastTraktor: null;
  tvilling: null;
}

interface Bremser {
  abs: null;
  bremsesystem: null;
  driftsbremsBak: null;
  driftsbremsForan: null;
  tilhengerBremseforbindelse: any[];
  trykkMeterledningTilhengerkopling: null;
  trykktilsluttning1: null;
  trykktilsluttning2: null;
}

interface Akslinger {
  akselGruppe: AkselGruppe[];
  antallAksler: number;
  forbindelseMellomDrivaksler: null;
}

interface AkselGruppe {
  akselListe: AkselListe;
  egenvektAkselGruppe: null;
  egenvektAkselGruppeMaks: null;
  egenvektAkselGruppeMin: null;
  fordelingAvTillattTotalvektAkselGruppeMaks: null;
  fordelingAvTillattTotalvektAkselGruppeMin: null;
  id: number;
  plasseringAkselGruppe: string;
  tekniskTillattAkselGruppeLast: number;
  tekniskTillattAkselGruppeLastVeg: null;
}

interface AkselListe {
  aksel: Aksel[];
}

interface Aksel {
  antallHjul: null;
  avstandTilNesteAksling: null;
  belastbar: null;
  bremseAksel: null;
  drivAksel: null;
  egenvektAksel: null;
  egenvektAkselMaks: null;
  egenvektAkselMin: null;
  fordelingAvTillattTotalvektAkselMaks: null;
  fordelingAvTillattTotalvektAkselMin: null;
  id: number;
  loftbar: null;
  luftfjaering: null;
  maksAvstandTilNesteAksling: null;
  maksimalSporvidde: null;
  minAvstandTilNesteAksling: null;
  minimalSporvidde: null;
  plasseringAksel: string;
  sporvidde: null;
  styreAksel: null;
  tekniskTillattAkselLast: number;
  tekniskTillattAkselLastForhoyet: null;
  tekniskTillattAkselLastVeg: null;
}

interface Kjoretoyklassifisering {
  beskrivelse: string;
  efTypegodkjenning: null;
  kjoretoyAvgiftsKode: Kjennemerketype;
  nasjonalGodkjenning: null;
  spesielleKjennetegn: string;
  tekniskKode: Kjennemerketype;
  tekniskUnderkode: TekniskUnderkode;
  iSamsvarMedTypegodkjenning: null;
}

interface TekniskUnderkode {
  kodeBeskrivelse: null;
  kodeNavn: null;
  kodeTypeId: null;
  kodeVerdi: string;
  tidligereKodeVerdi: any[];
}

interface Registreringsbegrensninger {
  registreringsbegrensning: any[];
}

interface ForstegangsGodkjenning {
  bruktimport: null;
  forstegangRegistrertDato: string;
  fortollingOgMva: null;
  godkjenningsId: string;
  godkjenningsundertype: Godkjenningsundertype;
  gyldigFraDato: string;
  gyldigFraDatoTid: string;
  kvalitetskodeForstegangRegDato: Kjennemerketype;
  oppbygdMedAvgiftsfritak: null;
  unntak: any[];
}

interface Godkjenningsundertype {
  kodeBeskrivelse: null;
  kodeNavn: string;
  kodeTypeId: null;
  kodeVerdi: string;
  tidligereKodeVerdi: any[];
}

interface Registrering {
  fomTidspunkt: string;
  kjoringensArt: null;
  neringskode: null;
  neringskodeBeskrivelse: null;
  registreringsstatus: Kjennemerketype;
  registrertForstegangPaEierskap: string;
  tilTidspunkt: null;
  vektarsavgiftOppgittGrunnlag: null;
  midlertidigAvregistreringArsak: null;
  avregistrertSidenDato: null;
}

interface Kjennemerke {
  fomTidspunkt: string;
  kjennemerke: string;
  kjennemerkekategori: string;
  kjennemerketype: Kjennemerketype;
  tilTidspunkt: null;
}

interface Kjennemerketype {
  kodeBeskrivelse: string;
  kodeNavn: string;
  kodeTypeId: null;
  kodeVerdi: string;
  tidligereKodeVerdi: any[];
}

interface Eierskap {
  eier: Eier;
  leasingtaker: null;
  medeier: null;
  underenhet: null;
  vedtakstidspunkt: null;
}

interface Eier {
  adresse: null;
  adressestatus: null;
  enhet: null;
  erUnntattOffentlighet: boolean;
  erUverifisert: null;
  fomTidspunkt: null;
  kundeId: null;
  person: null;
  tilTidspunkt: null;
}

interface Forstegangsregistrering {
  registrertForstegangNorgeDato: string;
}

interface KjoretoyId {
  imid: string;
  kjennemerke: string;
  kjoretoyErKryssbyttet: boolean;
  kryssbytter: any[];
  kuid: string;
  merkekode: string;
  understellsnummer: string;
  unntattOffentlighet: any[];
}