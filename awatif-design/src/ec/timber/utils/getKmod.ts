export function getKmod(
  serviceClass: string,
  loadDuration: string,
  material: string
) {
  // Determine kmod based on service class and load duration
  // The values of kmod coeffients are determined according to Table 3.1 in EC5
  const kmodValues: any = {
    // Standard: EN 14081-1
    "Solid timber": {
      "1": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 0.6,
        longTerm: 0.75,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1,
      },
      "3": {
        permanent: 0.5,
        longTerm: 0.55,
        mediumTerm: 0.65,
        shortTerm: 0.7,
        instantaneous: 0.9,
      },
    },

    // Standard: EN 14080
    "Glued laminated timber": {
      "1": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 0.6,
        longTerm: 0.75,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1,
      },
      "3": {
        permanent: 0.5,
        longTerm: 0.55,
        mediumTerm: 0.65,
        shortTerm: 0.7,
        instantaneous: 0.9,
      },
    },

    // standard: EN 14374, EN 14279
    LVL: {
      "1": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1,
      },
      "3": {
        permanent: 0.5,
        longTerm: 0.55,
        mediumTerm: 0.65,
        shortTerm: 0.7,
        instantaneous: 0.9,
      },
    },

    // Standard: EN 636.
    // Type EN 636-1 for servie class 1
    // Type EN 363-2 for service class 2
    // Type EN 636-3 for service class 3

    Plywood: {
      "1": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 0.6,
        longTerm: 0.7,
        mediumTerm: 0.8,
        shortTerm: 0.9,
        instantaneous: 1.1,
      },
      "3": {
        permanent: 0.5,
        longTerm: 0.55,
        mediumTerm: 0.65,
        shortTerm: 0.7,
        instantaneous: 0.9,
      },
    },

    // Standard: EN 300
    // OSB/2 for service class 1
    // OSB/3, OSB/4 for service class 2
    OSB: {
      "1": {
        permanent: 0.3,
        longTerm: 0.45,
        mediumTerm: 0.65,
        shortTerm: 0.85,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 0.3,
        longTerm: 0.4,
        mediumTerm: 0.55,
        shortTerm: 0.7,
        instantaneous: 0.9,
      },
    },

    // Standard: EN 312
    // Type P4, Type P5 for service class 1
    // Type P5 for service class 2
    Particleboard: {
      "1": {
        permanent: 0.3,
        longTerm: 0.45,
        mediumTerm: 0.65,
        shortTerm: 0.85,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 0.2,
        longTerm: 0.3,
        mediumTerm: 0.45,
        shortTerm: 0.6,
        instantaneous: 0.8,
      },
    },

    // Standard: EN 622-2
    // Type HB.LA, HB.HLA 1 or 2 for service class 1
    // Type HB.HLA1 or 2 for service class 2
    "Fibreboard, hard": {
      "1": {
        permanent: 0.3,
        longTerm: 0.45,
        mediumTerm: 0.65,
        shortTerm: 0.85,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 0.2,
        longTerm: 0.3,
        mediumTerm: 0.45,
        shortTerm: 0.6,
        instantaneous: 0.8,
      },
    },

    // Standard: EN 622-3
    // MBH.LA1 or 2 for service class 1
    // MBH.HLS1 or 2 for service class 2

    "Fibreboard, medium": {
      "1": {
        permanent: 0.2,
        longTerm: 0.4,
        mediumTerm: 0.6,
        shortTerm: 0.8,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 0.2,
        longTerm: 0.4,
        mediumTerm: 0.6,
        shortTerm: 0.8,
        instantaneous: 1.1,
      },
    },

    // Standard 622-5
    // MDF.LA, MDF.HLS for service class 1
    // MDF.HLS for service class 2
    "Fibreboard, MDF": {
      "1": {
        permanent: 0.2,
        longTerm: 0.4,
        mediumTerm: 0.6,
        shortTerm: 0.8,
        instantaneous: 1.1,
      },
      "2": {
        permanent: 1,
        longTerm: 1,
        mediumTerm: 1,
        shortTerm: 0.45,
        instantaneous: 0.8,
      },
    },
  };

  //Note: Modification factors for the influence of load-duration and moisture content on strength o are given in 3.1.3 in EC5
  // Get kmod based on material, service class, and load duration
  if (
    !kmodValues[material] ||
    !kmodValues[material][serviceClass] ||
    typeof kmodValues[material][serviceClass][loadDuration] !== "number"
  ) {
    throw new Error(
      "Invalid material type, service class, or load duration for kmod determination"
    );
  }
  let kmod = kmodValues[material][serviceClass][loadDuration];

  return kmod;
}
