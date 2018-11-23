export class ApiServiceUtil {
    public static readonly serviceBaseUrls: { [serviceName: string]: string } = {
        'carservice': 'http://localhost:10010',
        'motorcycleservice': 'http://localhost:10020',
        'orderservice': 'http://localhost:10030'
    };

    public static getApiUrl(requestUrl: string): string {
        const serviceBaseUrl = this.getServiceBaseUrl(requestUrl);
        const apiRequestAppendage = requestUrl.replace(`${serviceBaseUrl[0]}/`, '');

        return `${serviceBaseUrl[1]}/${apiRequestAppendage}`;
    }

    public static getServiceBaseUrl(requestUrl): [string, string] {
        return Object.entries(this.serviceBaseUrls).find(([serviceName, value]) => requestUrl.includes(serviceName));
    }

    public static getServiceName(requestUrl: string): string {
        return Object.entries(this.serviceBaseUrls).find(([serviceName, value]) => requestUrl.includes(value))[0];
    }
}

