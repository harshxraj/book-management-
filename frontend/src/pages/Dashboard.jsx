import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { Link, Navigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { Modal, Space, Input } from "antd";
import { RxDashboard } from "react-icons/rx";
import { PiStack } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/BookCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, error } = useQuery(GET_AUTHENTICATED_USER);
  // const [collapsed, setCollapsed] = useState(false);
  const role = data?.authUser?.role;

  const owned_books = useSelector((store) => store.user.owned_books);
  const borrowed_books = useSelector((store) => store.user.borrowed_books);
  const all_books = useSelector((store) => store.user.all_books);

  console.log(useSelector((store) => store.user));
  // console.log("OWNED", owned_books);
  console.log("k", borrowed_books);
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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<GiBookshelf />}>
            <Link to="/">
              {role == "admin" ? "Dashboard" : "Your collection"}
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PiStack />}>
            <Link to="/books">
              {role == "admin" ? "Books" : "Browse Books"}
            </Link>
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
            <h1 className="text-3xl mr-4">Dashboard</h1>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 800,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {role == "user" && (
            <div>
              <h1 className="text-3xl italic mb-3">Your Owned Books</h1>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {owned_books.map((book) => {
                  return <BookCard {...book} key={book._id} />;
                })}
              </div>

              <h1 className="text-3xl italic mb-3 mt-3">Your Borrowed Books</h1>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {borrowed_books.map((book) => {
                  return <BookCard {...book} key={book._id} />;
                })}
              </div>
            </div>
          )}

          {role == "admin" && (
            <div className="flex flex-col gap-3">
              <div className="h-20 bg-blue-400 flex items-center p-6 rounded-md text-2xl text">
                Total Books Registered: {all_books.length}
              </div>

              <div className="h-20 bg-green-400 flex items-center p-6 rounded-md text-2xl text">
                Total Available Books:{" "}
                {all_books.reduce(
                  (acc, el) => (el.status === "available" ? acc + 1 : acc),
                  0
                )}
              </div>

              <div className="h-20 bg-orange-400 flex items-center p-6 rounded-md text-2xl text">
                Total Bought Books:{" "}
                {all_books.reduce(
                  (acc, el) => (el.status === "bought" ? acc + 1 : acc),
                  0
                )}
              </div>

              <div className="h-20 bg-purple-400 flex items-center p-6 rounded-md text-2xl text">
                Total Borrowed Books:{" "}
                {all_books.reduce(
                  (acc, el) => (el.status === "borrowed" ? acc + 1 : acc),
                  0
                )}
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
