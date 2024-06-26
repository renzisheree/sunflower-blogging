import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import { collection, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-category {
      display: inline-block;
      padding: 8px 12px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      background-color: #f3f3f3;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }

    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 22px;
      color: white;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({ data }) => {
  // const [category, setCategory] = useState("");
  // useEffect(() => {
  //   const colRef = collection(db, "categories");
  //   const queries = query(colRef, where("id", "==", data.categoryId));
  // }, [data.categoryId]);
  if (!data || !data.id) return null;
  const date = new Date(data?.createdAt?.seconds * 1000);
  const formatDate = data?.createdAt.second
    ? new Date(date).toLocaleDateString("vi-VI")
    : "";
  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory to={data.category.slug}>
            {data.category.name}
          </PostCategory>
          <PostMeta
            date={formatDate}
            authorName={data.user.fullname}
          ></PostMeta>
        </div>
        <PostTitle to={data.slug} date size="big">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
