import React, { useState } from 'react'
import FirebaseContext from '../../firebase/context'
import LinkItem from './LinkItem'
import { LINKS_PER_PAGE } from '../../utils'
import axios from 'axios'

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [links, setLinks] = useState([])
  const [cursor, setCursor] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const isNewPage = props.location.pathname.includes('new')
  const isTopPage = props.location.pathname.includes('top')
  const page = Number(props.match.params.page)
  const linkRef = firebase.db.collection('links')

  React.useEffect(() => {
    const unsubscribe = getLinks()
    return () => unsubscribe()
  }, [isTopPage, page])

  // defaultのlinksの並び順
  function getLinks() {
    setLoading(true)
    const hasCursor = Boolean(cursor)
    if (isTopPage) {
      return linkRef
        .orderBy('voteCount', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot)
      // new pageのfirst page
    } else if (page === 1) {
      return linkRef
        .orderBy('created', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot)
    } else if (hasCursor) {
      return (
        linkRef
          .orderBy('created', 'desc')
          // afterで含めない、atで含める
          .startAfter(cursor.created)
          .limit(LINKS_PER_PAGE)
          .onSnapshot(handleSnapshot)
      )
    } else {
      const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE
      axios
        .get(
          `https://us-central1-hooks-news-app-98391.cloudfunctions.net/linksPagination?offset=${offset}`
        )
        .then((response) => {
          const links = response.data
          const lastLink = links[links.length - 1]
          setLinks(links)
          setCursor(lastLink)
          setLoading(false)
        })
      return () => {}
    }
  }

  function handleSnapshot(snapshot) {
    // .docsでsnapshotからdocumentsを取得
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })
    setLinks(links)
    const lastLink = links[links.length - 1]
    setCursor(lastLink)
    setLoading(false)
  }

  function visitPreviousPage() {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`)
    }
  }

  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`)
    }
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0

  return (
    <div style={{ opacity: loading ? 0.25 : 1 }}>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + pageIndex}
        />
      ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>
            Previous
          </div>
          <div className="pointer" onClick={visitNextPage}>
            Next
          </div>
        </div>
      )}
    </div>
  )
}

export default LinkList
