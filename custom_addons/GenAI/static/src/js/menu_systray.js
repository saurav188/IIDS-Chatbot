/* @odoo-module */
import { registry } from "@web/core/registry";
import { UserMenu } from "@web/webclient/user_menu/user_menu";
import { patch } from "@web/core/utils/patch";

registry.category("systray").remove("discuss.CallMenu")
registry.category("systray").remove("mail.activity_menu")
registry.category("systray").remove("mail.messaging_menu")

const userMenuRegistry = registry.category("user_menuitems");

userMenuRegistry.remove("documentation");
userMenuRegistry.remove("support");
// userMenuRegistry.remove("shortcuts");
userMenuRegistry.remove("odoo_account");
