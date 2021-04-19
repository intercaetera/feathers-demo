import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { VStack, Image, Heading } from "@chakra-ui/react";

import { authors, books } from "../feathers";
import BooksList from "../booksList.component";

export default function AuthorPage() {
  const [author, setAuthor] = useState(null);
  const [booksData, setBooksData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    authors.get(id).then(setAuthor);
    books.find({ query: { author: id, } })
      .then(setBooksData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Link to="/authors">{"<-"} Back</Link>
      {author && (
        <VStack spacing={4}>
          <Image
            boxSize={32}
            objectFit="contain"
            src={author.pictureLink}
            fallbackSrc="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg"
          />
          <Heading size="md">{author.name}</Heading>
        </VStack>
      )}
      {books && <BooksList books={booksData} />}
    </>
  );
}

