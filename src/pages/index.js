import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import App from "../components/App"

const IndexPage = () => (
  <Layout>
    <Router>
      <App path=":id1/:id2/:id3" />
      <App path=":id1/:id2" />
      <App path=":id1" />
      <App path="/"/>
    </Router>
  </Layout>)

export default IndexPage
