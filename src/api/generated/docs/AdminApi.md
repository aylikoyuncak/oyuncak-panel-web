# AdminApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAdminAdminDeleteUserIdPost**](#apiadminadmindeleteuseridpost) | **POST** /api/admin/admin-delete/{userId} | |
|[**apiAdminAdminListPost**](#apiadminadminlistpost) | **POST** /api/admin/admin-list | |
|[**apiAdminCampaignListPost**](#apiadmincampaignlistpost) | **POST** /api/admin/campaign-list | |
|[**apiAdminCampaignPost**](#apiadmincampaignpost) | **POST** /api/admin/campaign | |
|[**apiAdminDashboardDataPost**](#apiadmindashboarddatapost) | **POST** /api/admin/dashboard-data | |
|[**apiAdminDeleteCampaignCampaignIdPost**](#apiadmindeletecampaigncampaignidpost) | **POST** /api/admin/delete-campaign/{campaignId} | |
|[**apiAdminDeleteItemItemIdPost**](#apiadmindeleteitemitemidpost) | **POST** /api/admin/delete-item/{itemId} | |
|[**apiAdminGetCampaignCampaignIdGet**](#apiadmingetcampaigncampaignidget) | **GET** /api/admin/get-campaign/{campaignId} | |
|[**apiAdminGetItemItemIdGet**](#apiadmingetitemitemidget) | **GET** /api/admin/get-item/{itemId} | |
|[**apiAdminItemListPost**](#apiadminitemlistpost) | **POST** /api/admin/item-list | |
|[**apiAdminItemPost**](#apiadminitempost) | **POST** /api/admin/item | |
|[**apiAdminLoginPost**](#apiadminloginpost) | **POST** /api/admin/login | |
|[**apiAdminOrderDetailOrderIdGet**](#apiadminorderdetailorderidget) | **GET** /api/admin/order-detail/{orderId} | |
|[**apiAdminOrderListPost**](#apiadminorderlistpost) | **POST** /api/admin/order-list | |
|[**apiAdminRegisterPost**](#apiadminregisterpost) | **POST** /api/admin/register | |
|[**apiAdminSubscriptionDetailSubscriptionIdGet**](#apiadminsubscriptiondetailsubscriptionidget) | **GET** /api/admin/subscription-detail/{subscriptionId} | |
|[**apiAdminSubscriptionListPost**](#apiadminsubscriptionlistpost) | **POST** /api/admin/subscription-list | |
|[**apiAdminUpdateOrderStatusesPost**](#apiadminupdateorderstatusespost) | **POST** /api/admin/update-order-statuses | |
|[**apiAdminUpdateSubscriptionStatusPost**](#apiadminupdatesubscriptionstatuspost) | **POST** /api/admin/update-subscription-status | |
|[**apiAdminUserDetailUserIdGet**](#apiadminuserdetailuseridget) | **GET** /api/admin/user-detail/{userId} | |
|[**apiAdminUserListPost**](#apiadminuserlistpost) | **POST** /api/admin/user-list | |

# **apiAdminAdminDeleteUserIdPost**
> StringBaseCommandResult apiAdminAdminDeleteUserIdPost()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminAdminDeleteUserIdPost(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


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

# **apiAdminAdminListPost**
> UserListDtoPagedResultBaseCommandResult apiAdminAdminListPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    PaginationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let paginationRequest: PaginationRequest; // (optional)

const { status, data } = await apiInstance.apiAdminAdminListPost(
    paginationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationRequest** | **PaginationRequest**|  | |


### Return type

**UserListDtoPagedResultBaseCommandResult**

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

# **apiAdminCampaignListPost**
> CampaignDtoPagedResultBaseCommandResult apiAdminCampaignListPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    PaginationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let paginationRequest: PaginationRequest; // (optional)

const { status, data } = await apiInstance.apiAdminCampaignListPost(
    paginationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationRequest** | **PaginationRequest**|  | |


### Return type

**CampaignDtoPagedResultBaseCommandResult**

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

# **apiAdminCampaignPost**
> StringBaseCommandResult apiAdminCampaignPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    CampaignDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let campaignDto: CampaignDto; // (optional)

const { status, data } = await apiInstance.apiAdminCampaignPost(
    campaignDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignDto** | **CampaignDto**|  | |


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

# **apiAdminDashboardDataPost**
> DashboardDataBaseCommandResult apiAdminDashboardDataPost()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

const { status, data } = await apiInstance.apiAdminDashboardDataPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DashboardDataBaseCommandResult**

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

# **apiAdminDeleteCampaignCampaignIdPost**
> StringBaseCommandResult apiAdminDeleteCampaignCampaignIdPost()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let campaignId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminDeleteCampaignCampaignIdPost(
    campaignId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignId** | [**string**] |  | defaults to undefined|


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

# **apiAdminDeleteItemItemIdPost**
> StringBaseCommandResult apiAdminDeleteItemItemIdPost()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let itemId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminDeleteItemItemIdPost(
    itemId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemId** | [**string**] |  | defaults to undefined|


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

# **apiAdminGetCampaignCampaignIdGet**
> CampaignDtoBaseCommandResult apiAdminGetCampaignCampaignIdGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let campaignId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminGetCampaignCampaignIdGet(
    campaignId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignId** | [**string**] |  | defaults to undefined|


### Return type

**CampaignDtoBaseCommandResult**

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

# **apiAdminGetItemItemIdGet**
> ItemDtoBaseCommandResult apiAdminGetItemItemIdGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let itemId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminGetItemItemIdGet(
    itemId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemId** | [**string**] |  | defaults to undefined|


### Return type

**ItemDtoBaseCommandResult**

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

# **apiAdminItemListPost**
> ItemDtoPagedResultBaseCommandResult apiAdminItemListPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    PaginationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let paginationRequest: PaginationRequest; // (optional)

const { status, data } = await apiInstance.apiAdminItemListPost(
    paginationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationRequest** | **PaginationRequest**|  | |


### Return type

**ItemDtoPagedResultBaseCommandResult**

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

# **apiAdminItemPost**
> StringBaseCommandResult apiAdminItemPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    ItemDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let itemDto: ItemDto; // (optional)

const { status, data } = await apiInstance.apiAdminItemPost(
    itemDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemDto** | **ItemDto**|  | |


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

# **apiAdminLoginPost**
> UserBaseModelBaseCommandResult apiAdminLoginPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    LoginRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let loginRequestDto: LoginRequestDto; // (optional)

const { status, data } = await apiInstance.apiAdminLoginPost(
    loginRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequestDto** | **LoginRequestDto**|  | |


### Return type

**UserBaseModelBaseCommandResult**

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

# **apiAdminOrderDetailOrderIdGet**
> OrderDetailResponseBaseCommandResult apiAdminOrderDetailOrderIdGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let orderId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminOrderDetailOrderIdGet(
    orderId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **orderId** | [**string**] |  | defaults to undefined|


### Return type

**OrderDetailResponseBaseCommandResult**

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

# **apiAdminOrderListPost**
> OrderListAdminResponsePagedResultBaseCommandResult apiAdminOrderListPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    PaginationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let paginationRequest: PaginationRequest; // (optional)

const { status, data } = await apiInstance.apiAdminOrderListPost(
    paginationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationRequest** | **PaginationRequest**|  | |


### Return type

**OrderListAdminResponsePagedResultBaseCommandResult**

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

# **apiAdminRegisterPost**
> StringBaseCommandResult apiAdminRegisterPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    RegisterRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let registerRequestDto: RegisterRequestDto; // (optional)

const { status, data } = await apiInstance.apiAdminRegisterPost(
    registerRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerRequestDto** | **RegisterRequestDto**|  | |


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

# **apiAdminSubscriptionDetailSubscriptionIdGet**
> SubscriptionDetailResponseBaseCommandResult apiAdminSubscriptionDetailSubscriptionIdGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let subscriptionId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminSubscriptionDetailSubscriptionIdGet(
    subscriptionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionId** | [**string**] |  | defaults to undefined|


### Return type

**SubscriptionDetailResponseBaseCommandResult**

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

# **apiAdminSubscriptionListPost**
> SubscriptionListAdminResponsePagedResultBaseCommandResult apiAdminSubscriptionListPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    PaginationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let paginationRequest: PaginationRequest; // (optional)

const { status, data } = await apiInstance.apiAdminSubscriptionListPost(
    paginationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationRequest** | **PaginationRequest**|  | |


### Return type

**SubscriptionListAdminResponsePagedResultBaseCommandResult**

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

# **apiAdminUpdateOrderStatusesPost**
> StringBaseCommandResult apiAdminUpdateOrderStatusesPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdateOrderStatusesRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let updateOrderStatusesRequest: UpdateOrderStatusesRequest; // (optional)

const { status, data } = await apiInstance.apiAdminUpdateOrderStatusesPost(
    updateOrderStatusesRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateOrderStatusesRequest** | **UpdateOrderStatusesRequest**|  | |


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

# **apiAdminUpdateSubscriptionStatusPost**
> StringBaseCommandResult apiAdminUpdateSubscriptionStatusPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdateSubscriptionStatusRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let updateSubscriptionStatusRequest: UpdateSubscriptionStatusRequest; // (optional)

const { status, data } = await apiInstance.apiAdminUpdateSubscriptionStatusPost(
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

# **apiAdminUserDetailUserIdGet**
> UserDetailsDtoBaseCommandResult apiAdminUserDetailUserIdGet()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminUserDetailUserIdGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UserDetailsDtoBaseCommandResult**

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

# **apiAdminUserListPost**
> UserListDtoPagedResultBaseCommandResult apiAdminUserListPost()


### Example

```typescript
import {
    AdminApi,
    Configuration,
    PaginationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let paginationRequest: PaginationRequest; // (optional)

const { status, data } = await apiInstance.apiAdminUserListPost(
    paginationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paginationRequest** | **PaginationRequest**|  | |


### Return type

**UserListDtoPagedResultBaseCommandResult**

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

