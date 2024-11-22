"use client";
import React from "react";
import Link from "next/link";

export default function QuanlyCategories() {
  return (
    <>
      <h1 className="title">Quản lý Categories</h1>
      <div className="add-title">
        <ul className="breadcrumbs">
          <li>
            <Link href={"#"}>Home</Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link href={"#"} className="active">
              Categories
            </Link>
          </li>
        </ul>
        <Link href={"#"} className="add">
          Thêm danh mục
        </Link>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h6>Table</h6>
          </div>
          <div className="table-wrapper">
            <table className="authors-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên danh mục</th>
                  <th>Số lượng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="tableProduct">
                <tr>
                  <td>1</td>
                  <td>
                    <div className="author-info">
                      <div>
                        <small>Aó khoác nam</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="sdt">120</p>
                  </td>
                  <td>
                    <Link href={"#"} className="edit-link">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <Link href={"#"} className="delete-link">
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <div className="author-info">
                      <div>
                        <small>Aó khoác nữ</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="sdt">120</p>
                  </td>
                  <td>
                    <Link href={"#"} className="edit-link">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <Link href={"#"} className="delete-link">
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <div className="author-info">
                      <div>
                        <small>Khác</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="sdt">120</p>
                  </td>
                  <td>
                    <Link href={"#"} className="edit-link">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <Link href={"#"} className="delete-link">
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
