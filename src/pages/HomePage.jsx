import { useQuery } from "@tanstack/react-query";

import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";

import { getAllPosts } from "services/user";
import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";

import styled from "styled-components";

const Div = styled.div`
  display: flex;
`;

function HomePage() {
  const { data: posts, isLoading: postLoading } = useQuery(
    ["posts-list"],
    getAllPosts
  );
  const { data: categories, isLoading: categoryLoading } = useQuery(
    ["get-categories"],
    getCategory
  );
  return (
    <>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <Div>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </Div>
      )}
    </>
  );
}

export default HomePage;
