import {Control, FieldErrors} from 'react-hook-form';

interface FormProps {
  first_name: string;
  last_name: string;
  email_address: string;
  date_of_birth: string;
  password: string;
  username: string;
}

export type UserDetailsProps = {
  control: Control;
  errors: FieldErrors<FormProps>;
  getValues: () => any;
  handlePrevious?: () => void;
};

