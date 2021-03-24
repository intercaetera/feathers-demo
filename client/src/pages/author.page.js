import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { VStack, Image, Heading } from "@chakra-ui/react";

import { authors } from "../feathers";

export default function AuthorPage() {
  const [author, setAuthor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    authors.get(id).then(setAuthor);
  }, []);

  return (
    <>
      <Link to="/authors">{"<-"} Back</Link>
      {author && (
        <VStack spacing={4}>
          <Image boxSize={32} objectFit="contain" src={author.pictureLink} />
          <Heading size="md">{author.name}</Heading>
        </VStack>
      )}
    </>
  );
}
