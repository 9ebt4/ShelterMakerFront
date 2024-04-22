export interface GoogleUserDetailDTO {
    googleId: number;
    googleToken: string;
    facilityId: number | null;
    facilityIsActive: boolean | null;
    associateId: number | null;
    associateIsActive: boolean | null;
    firstName: string|null;
    lastName: string|null;
}