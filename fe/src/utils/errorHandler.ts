import { AxiosError } from "axios";
import { Endpoints } from "constants/index";
import { enqueueSnackbar } from "notistack";
import { IBackEndError } from "types/users";

export default function handleError(err: AxiosError<IBackEndError>) {
  console.log(err)
  if(err.config?.url === Endpoints.REFRESH_TOKEN) {
    enqueueSnackbar('Not authorized', { variant: 'error' });
    return;
  }
  if(Array.isArray(err.response?.data.errors)) {
    enqueueSnackbar(err.response?.data.errors[0].detail, { variant: 'error' });
  } else {
    enqueueSnackbar(err.response?.statusText || 'Something went wrong!', { variant: 'error' });
  }
}