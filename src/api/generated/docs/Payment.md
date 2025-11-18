# Payment


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
**price** | **string** |  | [optional] [default to undefined]
**paidPrice** | **string** |  | [optional] [default to undefined]
**installment** | **number** |  | [optional] [default to undefined]
**currency** | **string** |  | [optional] [default to undefined]
**paymentId** | **string** |  | [optional] [default to undefined]
**paymentStatus** | **string** |  | [optional] [default to undefined]
**fraudStatus** | **number** |  | [optional] [default to undefined]
**merchantCommissionRate** | **string** |  | [optional] [default to undefined]
**merchantCommissionRateAmount** | **string** |  | [optional] [default to undefined]
**iyziCommissionRateAmount** | **string** |  | [optional] [default to undefined]
**iyziCommissionFee** | **string** |  | [optional] [default to undefined]
**cardType** | **string** |  | [optional] [default to undefined]
**cardAssociation** | **string** |  | [optional] [default to undefined]
**cardFamily** | **string** |  | [optional] [default to undefined]
**cardToken** | **string** |  | [optional] [default to undefined]
**cardUserKey** | **string** |  | [optional] [default to undefined]
**binNumber** | **string** |  | [optional] [default to undefined]
**lastFourDigits** | **string** |  | [optional] [default to undefined]
**basketId** | **string** |  | [optional] [default to undefined]
**paymentItems** | [**Array&lt;PaymentItem&gt;**](PaymentItem.md) |  | [optional] [default to undefined]
**connectorName** | **string** |  | [optional] [default to undefined]
**authCode** | **string** |  | [optional] [default to undefined]
**hostReference** | **string** |  | [optional] [default to undefined]
**phase** | **string** |  | [optional] [default to undefined]
**mdStatus** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { Payment } from './api';

const instance: Payment = {
    status,
    errorCode,
    errorMessage,
    errorGroup,
    locale,
    systemTime,
    conversationId,
    price,
    paidPrice,
    installment,
    currency,
    paymentId,
    paymentStatus,
    fraudStatus,
    merchantCommissionRate,
    merchantCommissionRateAmount,
    iyziCommissionRateAmount,
    iyziCommissionFee,
    cardType,
    cardAssociation,
    cardFamily,
    cardToken,
    cardUserKey,
    binNumber,
    lastFourDigits,
    basketId,
    paymentItems,
    connectorName,
    authCode,
    hostReference,
    phase,
    mdStatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
