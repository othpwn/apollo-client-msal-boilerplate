import { useQuery, gql } from "@apollo/client";
export default function useQueryUser() {
  const query = gql`
    query user($where: user_bool_exp) {
      user(where: $where) {
        id
      }
    }
  `;

  const { data: users, loading } = useQuery(query);
  return {users, loading};
}
