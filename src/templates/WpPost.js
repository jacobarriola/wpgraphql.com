import React from "react"
import {Box, Flex, Heading} from '@chakra-ui/core'
import Layout from "../components/Layout"
import Container from "../components/Container"
import {graphql} from 'gatsby'
import PageTransition from "../components/PageTransition"
import {ParseHtml} from "../components/parse-html"
import TableOfContents from "../components/TableOfContents"
import Breadcrumb from "../components/breadcrumb/Breadcrumb"
import PostInfo from "../components/PostInfo"

const WpPost = ({data}) => {

    const {wpPost: {title, content, uri, author, date}} = data;

    const crumbs = [
        {
            title: `Blog`,
            path: `/blog`,
        },
        {
            title: title,
            path: uri,
            isCurrentPage: true,
        }
    ];

    return (

        <Layout>
            <Container>
                <Flex>
                    <Box style={{flex: 1}}>
                        <Box pt={3} pl={10} pr={0} mt="0" mx="auto" minH="80vh">
                            <PageTransition>
                                <Flex>
                                    <Box pt={3} mt="0" mx="auto" maxW="48rem" minH="80vh">
                                        <Breadcrumb crumbs={crumbs}/>
                                        <Heading as="h1" fontSize={`4xl`}>{title}</Heading>
                                        <PostInfo author={author.node.name} path={author.node.uri} date={date} />
                                        {ParseHtml(content)}
                                    </Box>
                                    <TableOfContents
                                        content={content}
                                        contentRef={ParseHtml(content)}
                                    />
                                </Flex>
                            </PageTransition>
                        </Box>
                    </Box>
                </Flex>
            </Container>
        </Layout>
    );
}

export const query = graphql`
query($id: String) {
    wpPost(id: { eq: $id }) {
        __typename
        id
        uri
        title
        content
        date(formatString: "MMMM Do, YYYY")
        author {
          node {
            id
            name
            uri
          }
        }
    }
}
`;

export default WpPost
