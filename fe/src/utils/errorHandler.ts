import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { IBackEndError } from "types";

export default function handleError(err: AxiosError<IBackEndError>) {
  if(Array.isArray(err.response?.data.errors)) {
    enqueueSnackbar(err.response?.data.errors[0].detail, { variant: 'error' });
  } else {
    enqueueSnackbar(err.response?.statusText || 'Something went wrong!', { variant: 'error' });
  }
}