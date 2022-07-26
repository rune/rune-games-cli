import { useQuery, gql } from "@apollo/client/index.js"

import { MeDocument } from "../generated/types.js"

export function useMe({ skip }: { skip?: boolean } = {}) {
  const { data, loading } = useQuery(MeDocument, { skip })

  return {
    me: data?.me,
    meLoading: loading,
  }
}

gql`
  query Me {
    me {
      id
      handle
      email
    }
  }
`
