import { PageStyled } from 'components/Shared/Styles'
import { PostContext } from 'context/post/PostContext'
import React, { useContext } from 'react'
import {
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  Icon,
  IconButton
} from 'rsuite'
import styled from 'styled-components'

const ArticleForm = styled(Form)``

const FormHeader = styled.header``
const CloseButton = styled(IconButton)`
  height: 40px !important;
  padding-left: 28px !important;

  > .rs-icon {
    width: 40px !important;
    height: 40px !important;
  }
`

const FormContent = styled.main``

const FormFooter = styled.footer``

const CreatePost: React.FC = () => {
  const post = useContext(PostContext)
  const { createUserPost } = post.actions
  console.log(createUserPost)
  return (
    <PageStyled>
      <ArticleForm>
        <FormHeader>
          <ButtonToolbar>
            <Button appearance="subtle" active={true}>
              Edit
            </Button>

            <Button appearance="subtle" active={false}>
              Preview
            </Button>

            <CloseButton icon={<Icon icon="close" />} appearance="subtle" />
          </ButtonToolbar>
        </FormHeader>

        <FormContent>
          <div>
            <FormGroup>
              <FormControl
                rows={5}
                name="textarea"
                componentClass="textarea"
                placeholder="New post title here..."
              />
            </FormGroup>

            <FormGroup>
              <FormControl
                rows={5}
                name="textarea"
                componentClass="textarea"
                placeholder="Write your post content here..."
              />
            </FormGroup>
          </div>

          <aside>
            <h2>Related</h2>
          </aside>
        </FormContent>

        <FormFooter>
          <Button appearance="primary">Create Post</Button>
        </FormFooter>
      </ArticleForm>
    </PageStyled>
  )
}

export { CreatePost }
