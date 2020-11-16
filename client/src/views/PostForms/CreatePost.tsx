import { PageStyled } from 'components/Shared/Styles'
import { PostContext } from 'context/post/PostContext'
import React, { useContext } from 'react'
import styled from 'styled-components'

const ArticleForm = styled.form``

const CreatePost: React.FC = () => {
  const post = useContext(PostContext)
  const { createSinglePost } = post.actions
  console.log(createSinglePost)
  return (
    <PageStyled>
      <ArticleForm>
        <header>header</header>
        <main>
          <div></div>

          <aside>
            <h2>Related</h2>
          </aside>
        </main>
        <footer>footer</footer>
      </ArticleForm>
    </PageStyled>
  )
}

export { CreatePost }
