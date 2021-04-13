import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { VStack, Image, Heading } from "@chakra-ui/react";

import { authors, books } from "../feathers";
import BooksList from '../booksList.component';

export default function AuthorPage() {
  const [author, setAuthor] = useState(null);
  const [booksData, setBooksData] = useState([]);
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
    {booksData && (
      <BooksList books={booksData} />
    )}
    </>
  );
}

