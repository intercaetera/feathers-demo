import { useState, useEffect } from "react";
import { Box, Input, Button, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import useUserData from "../useUserData";
import { books } from "../feathers";
import BooksList from "../booksList.component";

export default function BooksPage() {
  const user = useUserData();
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [booksData, setBooksData] = useState([]);

  const fetch = () => books.find().then(setBooksData);

  const onSubmit = (values) =>
    books
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
            <Input placeholder="Title" name="title" ref={register} />
            <Input placeholder="Author" name="author" ref={register} />
            <Input
              placeholder="Picture link"
              name="pictureLink"
              ref={register}
            />
            <Button type="submit">Add book</Button>
          </VStack>
        </form>
      )}
      <BooksList books={booksData} />
    </Box>
  );
}

