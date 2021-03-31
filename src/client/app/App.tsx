import React from 'react'
import styles from './App.module.scss'
import { parseMarkdown } from './parseMarkdown'

const App = () => {
  return (
    <div className={styles.root}>
      <h1>Parse Markdown demo</h1>
      <div>{parseMarkdown('This is a tiny app that parse markdown symbols to html using react')}</div>
      <div>{parseMarkdown('Currently now it only supports for *bold*, _italic_, and ~strike-through~')}</div>
      <br />
      <br />
      <hr />
      <h3>A poem</h3>
      <div>
        <p>{parseMarkdown('night train whistles *stars*')}</p>
        <p>{parseMarkdown('over a nation _under_')}</p>
        <p>{parseMarkdown('mad temporal czars')}</p>
        <br />
        <p>{parseMarkdown('round lumps of cells grow')}</p>
        <p>{parseMarkdown('up to *love* porridge later')}</p>
        <p>{parseMarkdown('become *The Supremes*')}</p>
        <br />
        <p>{parseMarkdown('lady I ~lost~ my')}</p>
        <p>{parseMarkdown('subway token we _must_ part')}</p>
        <p>{parseMarkdown("it's _faster_ by *air*")}</p>
        <p> - By Anselm Hollo</p>
      </div>
    </div>
  )
}

export default App
