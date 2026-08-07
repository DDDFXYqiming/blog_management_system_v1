import { useEffect, useState } from 'react'
import { getChannelAPI } from '@/api'
import type { Channel } from '@/types'

/** 获取专栏列表 */
export function useChannel(): { channelList: Channel[] } {
  const [channelList, setChannelList] = useState<Channel[]>([])

  useEffect(() => {
    const load = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    void load()
  }, [])

  return { channelList }
}
