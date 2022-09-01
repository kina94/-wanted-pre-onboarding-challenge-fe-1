import { AxiosError } from "axios";
import { MutationFunction, useMutation } from "react-query";
import { useQueryClient } from "react-query";
import React, { useState } from "react";
interface Props {
  mutationFunction: MutationFunction<any, any>;
  successListner?(): void;
  errorListner?(): void;
  key: string;
}

export const useMutationQuery = ({
  mutationFunction,
  successListner,
  errorListner,
  key,
}: Props) => {
  const [errorState, setErrorState] = useState("");
  const queryClient = useQueryClient();
  const mutationResults = useMutation(mutationFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      successListner!();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorState(error.response?.data.details);
        errorListner!();
      }
    },
  });
  return { mutationResults, errorState };
};
