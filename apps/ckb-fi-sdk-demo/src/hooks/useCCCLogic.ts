/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from '@/providers/AppProvider'
import { ccc } from '@ckb-ccc/connector-react'
import { toast } from 'react-toastify'

const useCCCLogic = () => {
  const { signer } = useApp()

  /**
   * signMessage - 消息签名，返回 signature
   * @param message 签名内容
   * @returns string | null
   */
  const signMessage = async (message: string) => {
    const signature = await signer.signMessage(message).catch(err => {
      console.error('signMessage error', err)
      toast.error(err.message)
    })
    if (!signature) return null
    return signature
  }

  /**
   * transferToken - 转账 Token，返回 txHash
   * @param to 转账目标地址
   * @param amount 转账数量
   * @returns string | null
   */
  const transferToken = async (to: string, amount: number) => {
    // 1.验证目标地址
    const toAddresses = await Promise.all(
      [to].map(addr => ccc.Address.fromString(addr, signer.client))
    )

    // 2.从类对象创建交易实例
    const tx = ccc.Transaction.from({
      outputs: toAddresses.map(({ script }) => ({ lock: script })),
      outputsData: []
    })

    // 3.数值格式转换
    tx.outputs.forEach((output, i) => {
      if (output.capacity > ccc.fixedPointFrom(amount)) {
        toast.error(`Insufficient capacity at output ${i} to store data`)
        return
      }
      output.capacity = ccc.fixedPointFrom(amount)
    })

    // 4.根据余额完成输入部分
    const resCapacity = await tx.completeInputsByCapacity(signer).catch(err => {
      console.error('completeInputsByCapacity', err)
      toast.error(err.message)
    })
    if (!resCapacity) return null
    console.log(resCapacity, 'resCapacity')

    // 5.计算交易费用
    const resFee = await tx.completeFeeBy(signer, 1000).catch(err => {
      console.error('completeFeeBy', err)
      toast.error(err.message)
    })
    if (!resFee) return null
    console.log(resFee, 'resFee')

    // 6.完成交易，获取 txHash
    const txHash = await signer.sendTransaction(tx).catch(err => {
      console.error('sendTransaction', err)
      toast.error(err.message)
    })
    if (!txHash) return null
    console.log('txHash', txHash)

    return txHash
  }

  /**
   * transferXUDT - 转账 XUDT，返回 txHash
   * @param to 转账目标地址
   * @param amount 转账数量
   * @param args 附加参数
   * @returns string | null
   */
  const transferXUDT = async (to: string, amount: string, args: any) => {
    // 1.验证目标地址
    const toAddresses = await Promise.all(
      [to].map(addr => ccc.Address.fromString(addr, signer.client))
    )
    const { script: change } = await signer.getRecommendedAddressObj()

    // 2.从客户端或已知参数创建脚本实例
    const xudtType = await ccc.Script.fromKnownScript(
      signer.client,
      ccc.KnownScript.XUdt,
      args
    )

    // 3.从类对象创建交易实例
    const tx = ccc.Transaction.from({
      outputs: toAddresses.map(({ script }) => ({
        lock: script,
        type: xudtType
      })),
      outputsData: Array.from(Array(toAddresses.length), () =>
        ccc.numLeToBytes(amount, 16)
      )
    })

    // 4.按 UDT 完成输入部分
    await tx.completeInputsByUdt(signer, xudtType).catch(err => {
      console.error('completeInputsByUdt', err)
      toast.error(err.message)
    })
    const balanceDiff =
      (await tx.getInputsUdtBalance(signer.client, xudtType)) -
      tx.getOutputsUdtBalance(xudtType)
    if (balanceDiff > ccc.Zero) {
      tx.addOutput(
        {
          lock: change,
          type: xudtType
        },
        ccc.numLeToBytes(balanceDiff, 16)
      )
    }

    // 5.添加脚本依赖
    await tx
      .addCellDepsOfKnownScripts(signer.client, ccc.KnownScript.XUdt)
      .catch(err => {
        console.error('addCellDepsOfKnownScripts', err)
        toast.error(err.message)
      })

    // 6.根据余额完成输入部分
    const resCapacity = await tx.completeInputsByCapacity(signer).catch(err => {
      console.error('completeInputsByCapacity', err)
      toast.error(err.message)
    })
    if (!resCapacity) return null
    console.log(resCapacity, 'resCapacity')

    // 7.计算交易费用
    const resFee = await tx.completeFeeBy(signer, 1000).catch(err => {
      console.error('completeFeeBy', err)
      toast.error(err.message)
    })
    if (!resFee) return null
    console.log(resFee, 'resFee')

    // 8.完成交易，获取 txHash
    const txHash = await signer.sendTransaction(tx).catch(err => {
      console.error('sendTransaction', err)
      toast.error(err.message)
    })
    if (!txHash) return null
    console.log('txHash', txHash)

    return txHash
  }

  return {
    signMessage,
    transferToken,
    transferXUDT
  }
}

export default useCCCLogic
