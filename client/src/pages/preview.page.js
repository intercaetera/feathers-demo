import { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { users, authors, books } from "../feathers";

export default function PreviewPage() {
  const [preview, setPreview] = useState({});

  useEffect(() => {
    Promise.all([
      users.find(),
      authors.find(),
      books.find(),
    ]).then(([users, authors, books]) => setPreview({ users, authors, books }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Object.entries(preview).map(([key, value]) => (
        <Box key={key} h="20rem" overflowY="scroll">
          <Heading>{key}</Heading>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </Box>
      ))}
    </>
  );
}

