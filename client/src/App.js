import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Flex, Container, useToast } from "@chakra-ui/react";

import LoginPage from "./pages/login.page";
import LogoutPage from "./pages/logout.page";
import SignUpPage from "./pages/signup.page";
import PreviewPage from "./pages/preview.page";
import AuthorsPage from "./pages/authors.page";
import AuthorPage from "./pages/author.page";
import BooksPage from "./pages/books.page";

import { UserContext } from "./useUserData";
import { users, reAuthenticate } from "./feathers";

export default function App() {
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(
    () =>
      reAuthenticate()
        .then((auth) => users.get(auth.user._id))
        .then((user) => {
          setUser(user);
          toast({ title: `Hello ${user.login}.`, status: "success" });
        })
        .catch((error) => console.error(error)),
    [toast]
  );

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Container
          w="100%"
          p={2}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Flex justifyContent="space-around">
            {user ? (
              <Link to="/logout">Logout</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
            <Link to="/books">Books</Link>
            <Link to="/authors">Authors</Link>
            <Link to="/preview">Preview</Link>
          </Flex>
        </Container>

        <Container p={2} pt={8}>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/logout">
              <LogoutPage />
            </Route>
            <Route path="/authors">
              <AuthorsPage />
            </Route>
            <Route path="/author/:id">
              <AuthorPage />
            </Route>
            <Route path="/books">
              <BooksPage />
            </Route>
            <Route path="/preview">
              <PreviewPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

