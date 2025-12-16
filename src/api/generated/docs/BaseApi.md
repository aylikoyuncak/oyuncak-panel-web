# BaseApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiBaseAddressAddresIdGet**](#apibaseaddressaddresidget) | **GET** /api/base/address/{addresId} | |
|[**apiBaseAddressPost**](#apibaseaddresspost) | **POST** /api/base/address | |
|[**apiBaseAddressesGet**](#apibaseaddressesget) | **GET** /api/base/addresses | |
|[**apiBaseBasketGet**](#apibasebasketget) | **GET** /api/base/basket | |
|[**apiBaseDeleteAddressIdPost**](#apibasedeleteaddressidpost) | **POST** /api/base/delete-address/{id} | |
|[**apiBaseDeliveryGet**](#apibasedeliveryget) | **GET** /api/base/delivery | |
|[**apiBaseDeliveryPost**](#apibasedeliverypost) | **POST** /api/base/delivery | |
|[**apiBaseNotificationSettingsGet**](#apibasenotificationsettingsget) | **GET** /api/base/notification-settings | |
|[**apiBaseNotificationSettingsPost**](#apibasenotificationsettingspost) | **POST** /api/base/notification-settings | |
|[**apiBaseOrderListPost**](#apibaseorderlistpost) | **POST** /api/base/order-list | |
|[**apiBasePaymentRequestPost**](#apibasepaymentrequestpost) | **POST** /api/base/payment-request | |
|[**apiBasePersonalInformationGet**](#apibasepersonalinformationget) | **GET** /api/base/personal-information | |
|[**apiBasePersonalInformationPost**](#apibasepersonalinformationpost) | **POST** /api/base/personal-information | |
|[**apiBasePreferencesItemsGet**](#apibasepreferencesitemsget) | **GET** /api/base/preferences-items | |
|[**apiBasePreferencesPost**](#apibasepreferencespost) | **POST** /api/base/preferences | |
|[**apiBasePreferencesUserIdGet**](#apibasepreferencesuseridget) | **GET** /api/base/preferences/{userId} | |
|[**apiBaseSubscriptionListPost**](#apibasesubscriptionlistpost) | **POST** /api/base/subscription-list | |
|[**apiBaseUpdateSubscriptionStatusPost**](#apibaseupdatesubscriptionstatuspost) | **POST** /api/base/update-subscription-status | |

# **apiBaseAddressAddresIdGet**
> AddressResponseDtoBaseCommandResult apiBaseAddressAddresIdGet()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let addresId: string; // (default to undefined)

const { status, data } = await apiInstance.apiBaseAddressAddresIdGet(
    addresId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addresId** | [**string**] |  | defaults to undefined|


### Return type

**AddressResponseDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseAddressPost**
> StringBaseCommandResult apiBaseAddressPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    AddressRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let addressRequestDto: AddressRequestDto; // (optional)

const { status, data } = await apiInstance.apiBaseAddressPost(
    addressRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addressRequestDto** | **AddressRequestDto**|  | |


### Return type

**StringBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseAddressesGet**
> AddressListResponseDtoListBaseCommandResult apiBaseAddressesGet()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

const { status, data } = await apiInstance.apiBaseAddressesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AddressListResponseDtoListBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseBasketGet**
> BasketResponseDtoBaseCommandResult apiBaseBasketGet()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let campaignCode: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiBaseBasketGet(
    campaignCode
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignCode** | [**string**] |  | (optional) defaults to undefined|


### Return type

**BasketResponseDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseDeleteAddressIdPost**
> StringBaseCommandResult apiBaseDeleteAddressIdPost()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiBaseDeleteAddressIdPost(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**StringBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseDeliveryGet**
> AddressResponseDtoBaseCommandResult apiBaseDeliveryGet()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

const { status, data } = await apiInstance.apiBaseDeliveryGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AddressResponseDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseDeliveryPost**
> StringBaseCommandResult apiBaseDeliveryPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    AddressRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let addressRequestDto: AddressRequestDto; // (optional)

const { status, data } = await apiInstance.apiBaseDeliveryPost(
    addressRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addressRequestDto** | **AddressRequestDto**|  | |


### Return type

**StringBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseNotificationSettingsGet**
> NotificationSettingsDtoBaseCommandResult apiBaseNotificationSettingsGet()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

const { status, data } = await apiInstance.apiBaseNotificationSettingsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**NotificationSettingsDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseNotificationSettingsPost**
> NotificationSettingsDtoBaseCommandResult apiBaseNotificationSettingsPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    NotificationSettingsDto
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let notificationSettingsDto: NotificationSettingsDto; // (optional)

const { status, data } = await apiInstance.apiBaseNotificationSettingsPost(
    notificationSettingsDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationSettingsDto** | **NotificationSettingsDto**|  | |


### Return type

**NotificationSettingsDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseOrderListPost**
> OrderListResponsePagedResultBaseCommandResult apiBaseOrderListPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    PaginationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let paginationRequest: PaginationRequest; // (optional)

const { status, data } = await apiInstance.apiBaseOrderListPost(
    paginationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationRequest** | **PaginationRequest**|  | |


### Return type

**OrderListResponsePagedResultBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBasePaymentRequestPost**
> PaymentResponseDtoBaseCommandResult apiBasePaymentRequestPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    PaymentRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let paymentRequestDto: PaymentRequestDto; // (optional)

const { status, data } = await apiInstance.apiBasePaymentRequestPost(
    paymentRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentRequestDto** | **PaymentRequestDto**|  | |


### Return type

**PaymentResponseDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBasePersonalInformationGet**
> PersonalInformationDtoBaseCommandResult apiBasePersonalInformationGet()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

const { status, data } = await apiInstance.apiBasePersonalInformationGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**PersonalInformationDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBasePersonalInformationPost**
> StringBaseCommandResult apiBasePersonalInformationPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    PersonalInformationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let personalInformationDto: PersonalInformationDto; // (optional)

const { status, data } = await apiInstance.apiBasePersonalInformationPost(
    personalInformationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **personalInformationDto** | **PersonalInformationDto**|  | |


### Return type

**StringBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBasePreferencesItemsGet**
> PreferencesItemsViewModelBaseCommandResult apiBasePreferencesItemsGet()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let boxNumber: Box; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiBasePreferencesItemsGet(
    boxNumber
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **boxNumber** | **Box** |  | (optional) defaults to undefined|


### Return type

**PreferencesItemsViewModelBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBasePreferencesPost**
> StringBaseCommandResult apiBasePreferencesPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    ChildInfoRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let childInfoRequestDto: ChildInfoRequestDto; // (optional)

const { status, data } = await apiInstance.apiBasePreferencesPost(
    childInfoRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **childInfoRequestDto** | **ChildInfoRequestDto**|  | |


### Return type

**StringBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBasePreferencesUserIdGet**
> ChildInfoResponseDtoBaseCommandResult apiBasePreferencesUserIdGet()


### Example

```typescript
import {
    BaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.apiBasePreferencesUserIdGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**ChildInfoResponseDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseSubscriptionListPost**
> SubscriptionListResponsePagedResultBaseCommandResult apiBaseSubscriptionListPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    PaginationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let paginationRequest: PaginationRequest; // (optional)

const { status, data } = await apiInstance.apiBaseSubscriptionListPost(
    paginationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationRequest** | **PaginationRequest**|  | |


### Return type

**SubscriptionListResponsePagedResultBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiBaseUpdateSubscriptionStatusPost**
> StringBaseCommandResult apiBaseUpdateSubscriptionStatusPost()


### Example

```typescript
import {
    BaseApi,
    Configuration,
    UpdateSubscriptionStatusRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new BaseApi(configuration);

let updateSubscriptionStatusRequest: UpdateSubscriptionStatusRequest; // (optional)

const { status, data } = await apiInstance.apiBaseUpdateSubscriptionStatusPost(
    updateSubscriptionStatusRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSubscriptionStatusRequest** | **UpdateSubscriptionStatusRequest**|  | |


### Return type

**StringBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

