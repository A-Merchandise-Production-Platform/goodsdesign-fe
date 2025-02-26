export type Province = {
  provinceID: number;
  provinceName: string;
};

export type District = {
  districtID: number;
  districtName: string;
  provinceID: number;
};

export type Ward = {
  wardCode: number;
  wardName: string;
  districtID: number;
};
