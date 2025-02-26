import { axiosInstance } from '@/api';
import { ApiResponse } from '@/api/types';
import { District, Province, Ward } from '@/api/types/shipping';

export namespace ShippingApi {
  export async function getAllProvinces() {
    const reponse = await axiosInstance.get<ApiResponse<Province[]>>(
      '/shippings/provinces',
    );
    const sortedProvinces = reponse.data.data.sort((a, b) => {
      if (a.provinceName < b.provinceName) return -1;
      if (a.provinceName > b.provinceName) return 1;
      return 0;
    });
    return sortedProvinces;
  }

  export async function getProvinceById(id: number) {
    const reponse = await axiosInstance.get<ApiResponse<Province>>(
      '/shippings/provinces',
    );
    return reponse.data;
  }

  export async function getAllDistricts(provinceId: number) {
    const reponse = await axiosInstance.get<ApiResponse<District[]>>(
      `/shippings/districts`,
      {
        params: {
          provinceId,
        },
      },
    );
    const sortedDistricts = reponse.data.data.sort((a, b) => {
      if (a.districtName < b.districtName) return -1;
      if (a.districtName > b.districtName) return 1;
      return 0;
    });
    return sortedDistricts;
  }

  export async function getDistrictById(id: number) {
    const reponse = await axiosInstance.get<ApiResponse<District>>(
      '/shippings/districts',
    );
    return reponse.data;
  }

  export async function getAllWards(districtId: number) {
    const reponse = await axiosInstance.get<ApiResponse<Ward[]>>(
      `/shippings/wards`,
      {
        params: {
          districtId,
        },
      },
    );
    const sortedWards = reponse.data.data.sort((a, b) => {
      if (a.wardName < b.wardName) return -1;
      if (a.wardName > b.wardName) return 1;
      return 0;
    });
    return sortedWards;
  }

  export async function getWardById(id: number) {
    const reponse =
      await axiosInstance.get<ApiResponse<Ward>>('/shippings/wards');
    return reponse.data;
  }

  export async function getAvailableShippingMethods() {}
}
