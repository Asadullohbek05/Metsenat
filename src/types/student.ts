export interface Institute {
  name: string;
  id: number;
}
export interface StudentDetails {
  full_name: string;
  phone: string;
  institute?: Institute;
  type?: number;
  given: number;
  contract: number;
}
export interface StudentSponsors {
  full_name: string;
  phone: string;
  institute?: Institute;
  type?: number;
  given: number;
  contract: number;
  length: number;
  id: number;
  sponsor: {
    full_name: string;
  };
  summa: number;
}
