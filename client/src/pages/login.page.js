import { VStack, Input, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { authenticate } from "../feathers";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const onSubmit = (values) =>
    authenticate({ strategy: "local", ...values })
      .then(() =>
        window.location = '/'
      )
      .catch(({ message }) =>
        toast({
          status: "error",
          title: "There was an error.",
          description: message,
        })
      );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack maxW="24rem" m="auto" spacing={4} shouldWrapChildren>
        <Input placeholder="Login" name="login" ref={register} />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          ref={register}
        />
        <Button type="submit">Log in</Button>
      </VStack>
    </form>
  );
}

