import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { CiLogout } from "react-icons/ci";

import { Layout, Menu, Button, theme, Input } from "antd";
import { GiBookshelf } from "react-icons/gi";
const { Header, Sider, Content } = Layout;
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiStack } from "react-icons/pi";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/course.query";
import CourseCard from "../components/CourseCard";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import AddCourse from "../components/AddBook";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import BookCard from "../components/BookCard";
import { SEARCH_BOOKS_QUERY } from "../../graphql/queries/book.query";

const Courses = () => {
  const { Search } = Input;
  const [query, setQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const all_books = useSelector((store) => store.user.all_books);
  const {
    loading: authLoading,
    data,
    error,
  } = useQuery(GET_AUTHENTICATED_USER);
  const {
    loading: searchBooksLoading,
    error: searchBooksError,
    data: searchBooksdata,
  } = useQuery(SEARCH_BOOKS_QUERY, {
    variables: { query: query, filterQuery: filterQuery },
  });

  const role = data?.authUser?.role;
  console.log("SEARCH DATA", searchBooksdata);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [logout, { loading }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };
  const onSearch = (value, _e, info) => {
    console.log(value);
    setQuery(value);
  };

  const displayedBooks =
    query || filterQuery ? searchBooksdata?.searchBooks || [] : all_books;
  const noBooksFound = query && displayedBooks.length === 0;

  const [collapsed, setCollapsed] = useState(window.innerWidth <= 720);

  const updateScreenWidth = () => {
    setCollapsed(window.innerWidth <= 720);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  return (
    <Layout className="h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" icon={<RxDashboard />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PiStack />}>
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            <Link to="/lectures">Lectures</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<CiLogout />} onClick={handleLogout}>
            <h1>Logout</h1>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <div className="flex items-center">
              {role == "admin" && (
                <>
                  <h1 className="text-3xl font-medium mr-5 pb-2">Books</h1>
                  <AddCourse />
                </>
              )}

              {role == "user" && (
                <div className=" flex items-center">
                  <h1 className="text-3xl italic">Buy or Borrow books here</h1>
                  <GiBookshelf size={30} className="ml-4" />
                </div>
              )}
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="flex lg:flex-row md:flex-col sm:flex-col sm:mb-4 md:mb-4 justify-between">
            <Search
              placeholder="Seach for books here"
              allowClear
              onSearch={onSearch}
              style={{ width: "50%", paddingBottom: "12px" }}
            />
            <div className="flex gap-2 items-center text-white">
              <h1 className="text-black mr-3 text-base pb-1">
                Filter by status
              </h1>
              <div
                className={`bg-green-600 ${
                  filterQuery == "available"
                    ? "ring-green-600 ring-4 ring-offset-2"
                    : ""
                }    px-2 rounded-md hover:cursor-pointer`}
                onClick={() => setFilterQuery("available")}
              >
                Available
              </div>
              <div
                className={`bg-blue-500 px-2 rounded-md hover:cursor-pointer ${
                  filterQuery == "borrowed"
                    ? "ring-blue-500 ring-4 ring-offset-2"
                    : ""
                }`}
                onClick={() => setFilterQuery("borrowed")}
              >
                Borrowed
              </div>
              <div
                className={`bg-red-500 px-2 rounded-md hover:cursor-pointer ${
                  filterQuery == "bought"
                    ? "ring-red-500 ring-4 ring-offset-2"
                    : ""
                }`}
                onClick={() => setFilterQuery("bought")}
              >
                Bought
              </div>
              <div
                className="bg-gray-500 px-2 rounded-md border hover:cursor-pointer"
                onClick={() => setFilterQuery("")}
              >
                Reset
              </div>
            </div>
          </div>

          {noBooksFound && !searchBooksLoading && (
            <div className="flex justify-center items-center border-1 h-[40px] bg-gray-500 text-white rounded-md">
              <h1>No Books found!</h1>
            </div>
          )}
          <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
            {displayedBooks.map((book) => {
              return <BookCard key={book._id} {...book} />;
            })}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Courses;
