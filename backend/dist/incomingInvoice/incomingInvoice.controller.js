"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingInvoiceController = void 0;
const common_1 = require("@nestjs/common");
const incomingInvoice_service_1 = require("./incomingInvoice.service");
let IncomingInvoiceController = class IncomingInvoiceController {
    constructor(incomingInvoiceService) {
        this.incomingInvoiceService = incomingInvoiceService;
    }
    async getInvoiceById(id) {
        return this.incomingInvoiceService.invoice({ id: Number(id) });
    }
    async getInvoices() {
        return this.incomingInvoiceService.invoices();
    }
    async createInvoice(incomingInvoiceData) {
        return this.incomingInvoiceService.createInvoice(incomingInvoiceData);
    }
    async updateInvoice(id, data) {
        return this.incomingInvoiceService.updateInvoice({
            where: { id: Number(id) },
            data: {
                name: data.name,
                fileName: data.fileName,
                startDate: data.startDate,
                endDate: data.endDate,
                amount: data.amount,
            },
        });
    }
    async deleteInvoice(id) {
        return this.incomingInvoiceService.deleteInvoice({ id: Number(id) });
    }
};
exports.IncomingInvoiceController = IncomingInvoiceController;
__decorate([
    (0, common_1.Get)('incomingInvoice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncomingInvoiceController.prototype, "getInvoiceById", null);
__decorate([
    (0, common_1.Get)('incomingInvoices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IncomingInvoiceController.prototype, "getInvoices", null);
__decorate([
    (0, common_1.Post)('incomingInvoice'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomingInvoiceController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Put)('updateIncomingInvoice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IncomingInvoiceController.prototype, "updateInvoice", null);
__decorate([
    (0, common_1.Delete)('incomingInvoice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncomingInvoiceController.prototype, "deleteInvoice", null);
exports.IncomingInvoiceController = IncomingInvoiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [incomingInvoice_service_1.IncomingInvoiceService])
], IncomingInvoiceController);
//# sourceMappingURL=incomingInvoice.controller.js.map