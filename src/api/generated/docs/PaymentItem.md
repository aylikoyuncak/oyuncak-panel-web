# PaymentItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **string** |  | [optional] [default to undefined]
**errorCode** | **string** |  | [optional] [default to undefined]
**errorMessage** | **string** |  | [optional] [default to undefined]
**errorGroup** | **string** |  | [optional] [default to undefined]
**locale** | **string** |  | [optional] [default to undefined]
**systemTime** | **number** |  | [optional] [default to undefined]
**conversationId** | **string** |  | [optional] [default to undefined]
**itemId** | **string** |  | [optional] [default to undefined]
**paymentTransactionId** | **string** |  | [optional] [default to undefined]
**transactionStatus** | **number** |  | [optional] [default to undefined]
**price** | **string** |  | [optional] [default to undefined]
**paidPrice** | **string** |  | [optional] [default to undefined]
**merchantCommissionRate** | **string** |  | [optional] [default to undefined]
**merchantCommissionRateAmount** | **string** |  | [optional] [default to undefined]
**iyziCommissionRateAmount** | **string** |  | [optional] [default to undefined]
**iyziCommissionFee** | **string** |  | [optional] [default to undefined]
**blockageRate** | **string** |  | [optional] [default to undefined]
**blockageRateAmountMerchant** | **string** |  | [optional] [default to undefined]
**blockageRateAmountSubMerchant** | **string** |  | [optional] [default to undefined]
**blockageResolvedDate** | **string** |  | [optional] [default to undefined]
**subMerchantKey** | **string** |  | [optional] [default to undefined]
**subMerchantPrice** | **string** |  | [optional] [default to undefined]
**subMerchantPayoutRate** | **string** |  | [optional] [default to undefined]
**subMerchantPayoutAmount** | **string** |  | [optional] [default to undefined]
**merchantPayoutAmount** | **string** |  | [optional] [default to undefined]
**convertedPayout** | [**ConvertedPayout**](ConvertedPayout.md) |  | [optional] [default to undefined]

## Example

```typescript
import { PaymentItem } from './api';

const instance: PaymentItem = {
    status,
    errorCode,
    errorMessage,
    errorGroup,
    locale,
    systemTime,
    conversationId,
    itemId,
    paymentTransactionId,
    transactionStatus,
    price,
    paidPrice,
    merchantCommissionRate,
    merchantCommissionRateAmount,
    iyziCommissionRateAmount,
    iyziCommissionFee,
    blockageRate,
    blockageRateAmountMerchant,
    blockageRateAmountSubMerchant,
    blockageResolvedDate,
    subMerchantKey,
    subMerchantPrice,
    subMerchantPayoutRate,
    subMerchantPayoutAmount,
    merchantPayoutAmount,
    convertedPayout,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
