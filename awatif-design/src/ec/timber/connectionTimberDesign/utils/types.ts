
export type TimberBarConnectionDesignerInput = {
    serviceClass: number;
    loadDurationClass: string;
    element: number;
    timberGrade: string;
    fastenerGrade: string;
    fastenerDiameter: number;
    sheetGrade: string;
    sheetThickness: number;
    sheetNo: number;
};

export type TimberBarConnectionDesignerLocalInput = {

    width: number;
    height: number;
    axialForce: number;
    beamAngle: number;

} & TimberBarConnectionDesignerInput


export type TimberBarConnectionDesignerOutput = {
    element: number;
    beamAngle: number;
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
    sheetLength: number;
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
