
export type TimberBarConnectionDesignerInput = {
    serviceClass: number;
    loadDurationClass: string;
    beam: number;
    timberGrade: string;
    width: number;
    height: number;
    axialForce: number;
    fastenerGrade: string;
    fastenerDiameter: number;
    sheetGrade: string;
    sheetThickness: number;
    sheetNo: number;
    beamAngle: number
};

export type TimberBarConnectionDesignerOutput = {
    kMod: number;
    gamma: number;
    chi: number;
    minDistancesListTimber: number[];
    minDistancesListSteel: number[];
    distancesListRequired: number[];
    coordinatesX: number[],
    coordinatesY: number[],
    fub: number;
    Myrk: number;
    fh0k: number;
    fhalphak: number;
    Fvrd: number;
    Fvrd_1: number;
    Fvrd_2: number;
    Fvrk_1: number;
    Fvrk_2: number;
    Fvrk_f: number;
    Fvrk_g: number;
    Fvrk_h: number;
    Fvrk_l: number;
    Fvrk_m: number;
    sheetNo: number;
    noTotal: number;
    noTotalEffective: number;
    noAxial: number;
    noAxialEffective: number;
    noPerp: number;
    FvrdTotal: number;
    fastenerCheck: number;
    distancesFinal: number[];
    Anet: number;
    fct0k: number;
    fctd: number;
    force: number;
    sigmact0d: number;
    befct: number;
    etaAxialCheck: number;
    Lh: number;
    Lv: number;
    Ant: number;
    Anv: number;
    VeffRd: number;
    etaBlockFailure: number;
};
