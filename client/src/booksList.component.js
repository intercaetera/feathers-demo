import { VStack, HStack, Image, Box, Text } from '@chakra-ui/react';

export default function BooksList({ books }) {
  return (
    <VStack spacing={4} p={8}>
      {books.map((book) => (
        <HStack textAlign="left" key={book._id} w="100%">
          <Image
            boxSize={16}
            objectFit="contain"
            src={book.pictureLink}
            m="auto"
          />
          <Box w="100%">
            <Text fontSize="lg" fontWeight="bold">
              {book.title}
            </Text>
            <Text fontSize="md">{book.author.name}</Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  );
}

