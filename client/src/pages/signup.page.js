import { VStack, Input, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { users } from "../feathers";

export default function SignUpPage() {
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const onSubmit = (values) =>
    users
      .create(values)
      .then(() =>
        window.location = '/'
      )
      .catch(({ errors }) =>
        toast({
          status: "error",
          title: "There was an error.",
          description: JSON.stringify(errors, null, 2),
        })
      );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack maxW="24rem" m="auto" spacing={4} shouldWrapChildren>
        <Input placeholder="Login" name="login" ref={register} />
        <Input placeholder="Email" name="email" type="email" ref={register} />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          ref={register}
        />
        <Input
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          ref={register}
        />
        <Button type="submit">Sign up</Button>
      </VStack>
    </form>
  );
}

