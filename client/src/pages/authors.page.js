import { useState, useEffect } from "react";
import {
  Box,
  Link,
  Text,
  Input,
  Image,
  Button,
  VStack,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import useUserData from "../useUserData";
import { authors } from "../feathers";

export default function AuthorsPage() {
  const user = useUserData();
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [authorsData, setAuthorsData] = useState([]);

  const fetch = () => authors.find().then(setAuthorsData);

  const onSubmit = (values) =>
    authors
      .create(values)
      .then(() => fetch())
      .catch(({ message }) =>
        toast({
          status: "error",
          title: "There was an error.",
          description: JSON.stringify(message, null, 2),
        })
      );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack
            maxW="24rem"
            m="auto"
            spacing={4}
            pb={4}
            borderBottom="1px solid"
            borderColor="gray.200"
            shouldWrapChildren
          >
            <Input placeholder="Name" name="name" ref={register} />
            <Input
              placeholder="Picture link"
              name="pictureLink"
              ref={register}
            />
            <Button type="submit">Add author</Button>
          </VStack>
        </form>
      )}
      <Wrap spacing={4} pt={4} shouldWrapChildren>
        {authorsData.map((author) => (
          <Link as={RouterLink} to={`/author/${author._id}`} key={author._id}>
            <Box textAlign="center">
              <Image
                boxSize={16}
                objectFit="contain"
                src={author.pictureLink}
                fallbackSrc="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg"
                m="auto"
              />
              <Text>{author.name}</Text>
            </Box>
          </Link>
        ))}
      </Wrap>
    </Box>
  );
}

