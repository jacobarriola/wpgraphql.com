import React from 'react'
import { graphql } from 'gatsby'
import {Box, Flex, Heading, Stack, Text} from '@chakra-ui/core'
import Layout from '../components/layout'
import Container from "../components/container";
import ExtensionPreview from '../components/extensionPreview'
import PageTransition from "../components/page-transition"
import Breadcrumb from "../components/breadcrumb/breadcrumb";

const ExtensionPlugins = ({ data }) => {
  const extensions = data.allWpExtensionPlugin.nodes
  const crumbs = [
    {
      title: `Extensionss`,
      path: `/extensions`,
      isCurrentPage: true,
    }
  ];

  return (
    <Layout>
        <Container>
            <Flex>
                <div style={{flex: 1}}>
                    <Box pt={3} px={5} mt="0" mx="auto" maxW="60rem" minH="80vh">
                        <PageTransition>
                            <Breadcrumb crumbs={crumbs} />
                            <Heading as={`h1`} m="0" mb="3" size="4xl">
                                WPGraphQL Extensions
                            </Heading>
                            <Text fontSize="2xl" mt="2">
                                WPGraphQL can be extended to integrate with other WordPress plugins. Here is a list of WPGraphQL extension plugins. Many of these plugins are maintained by community contributors.
                            </Text>
                            <Stack mt={5} spacing={8}>
                                {extensions.map(extension => (
                                  <ExtensionPreview
                                    key={extension.id}
                                    title={extension.title}
                                    path={extension.uri}
                                    content={extension.content}
                                  />
                                ))}
                                </Stack>
                          </PageTransition>
                    </Box>
                </div>
            </Flex>
        </Container>
    </Layout>
  );
}

export const data = graphql`
  {
    allWpExtensionPlugin(sort: {order: DESC, fields: date}) {
      nodes {
        title
        id
        content
        date
        uri
      }
    }
  }
`

export default ExtensionPlugins;
