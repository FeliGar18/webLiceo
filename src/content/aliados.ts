/**
 * Instituciones con convenios de articulación o alianzas con el liceo
 * (FUENTE_PEI, análisis externo). Los logos los entregó el liceo; en
 * public/images/aliados se guardaron recortados al borde y en tamaño uniforme,
 * sin cambiar sus colores ni proporciones.
 */
export type Aliado = {
  nombre: string;
  logo: string;
  ancho: number;
  alto: number;
  /** País bajo el logo, para las instituciones extranjeras. */
  pais?: string;
};

export const aliados: Aliado[] = [
  { nombre: "Universidad Austral de Chile", logo: "/images/aliados/universidad-austral.png", ancho: 348, alto: 200 },
  { nombre: "INACAP", logo: "/images/aliados/inacap.png", ancho: 350, alto: 95 },
  { nombre: "Universidad San Sebastián", logo: "/images/aliados/universidad-san-sebastian.png", ancho: 400, alto: 123 },
  { nombre: "Santo Tomás", logo: "/images/aliados/santo-tomas.png", ancho: 200, alto: 200 },
  { nombre: "Universidad de Los Lagos", logo: "/images/aliados/universidad-de-los-lagos.png", ancho: 361, alto: 133 },
  { nombre: "AIEP", logo: "/images/aliados/aiep.png", ancho: 400, alto: 140 },
  { nombre: "Duoc UC", logo: "/images/aliados/duoc-uc.png", ancho: 400, alto: 92 },
  { nombre: "IPG", logo: "/images/aliados/ipg.png", ancho: 400, alto: 132 },
  { nombre: "WorldSkills Chile", logo: "/images/aliados/worldskills-chile.png", ancho: 257, alto: 200 },
  { nombre: "WorldSkills Americas", logo: "/images/aliados/worldskills-americas.png", ancho: 207, alto: 176 },
  { nombre: "SENA (Colombia)", logo: "/images/aliados/sena.png", ancho: 205, alto: 200, pais: "Colombia" },
  { nombre: "SENAI (Brasil)", logo: "/images/aliados/senai.png", ancho: 400, alto: 95, pais: "Brasil" },
];
