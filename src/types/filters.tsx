export interface FiltersState {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export type tableColumns = (keyof FiltersState)[];

export enum FilterField {
  Name = "name",
  Username = "username",
  Email = "email",
  Phone = "phone",
}
export interface FilterInputProps {
  column: keyof FiltersState;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    column: keyof FiltersState
  ) => void;
}
