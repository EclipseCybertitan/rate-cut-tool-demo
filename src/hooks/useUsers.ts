import useSWR from 'swr'

async function fetcher(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    ;(error as any).info = await res.json()
    ;(error as any).status = res.status
    throw error
  }
  return res.json()
}

export function useUser(email: string) {
  const { data, error, isLoading, mutate } = useSWR(
    email ? `/api/users?email=${email}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  return {
    user: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

// 创建或获取用户
export async function createOrGetUser(email: string) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Failed to create or get user')
  }

  return res.json()
}

// 获取用户信息
export async function getUser(email: string) {
  const res = await fetch(`/api/users?email=${email}`)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Failed to get user')
  }

  return res.json()
}
