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

export function usePortfolios(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/portfolio?userId=${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // 30秒刷新一次
    }
  )

  return {
    portfolios: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function usePortfolio(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/portfolio/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  return {
    portfolio: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

// 创建portfolio
export async function createPortfolio(userId: string, portfolio: any) {
  const res = await fetch('/api/portfolio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, portfolio }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Failed to create portfolio')
  }

  return res.json()
}

// 更新portfolio
export async function updatePortfolio(id: string, portfolio: any) {
  const res = await fetch('/api/portfolio', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, portfolio }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Failed to update portfolio')
  }

  return res.json()
}

// 删除portfolio
export async function deletePortfolio(id: string) {
  const res = await fetch(`/api/portfolio?id=${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Failed to delete portfolio')
  }

  return res.json()
}
