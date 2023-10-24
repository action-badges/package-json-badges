import { promises as fs } from "fs";
import core from "@actions/core";
import { BaseAction } from "@action-badges/core";
import { addv, semverVersionColor } from "./formatters.js";

class PackageJsonLicense extends BaseAction {
  get label() {
    return "license";
  }

  async fetch() {
    return JSON.parse(await fs.readFile("./package.json", "utf8"));
  }

  async validate(packageJson) {
    if (packageJson.license) {
      return packageJson;
    }
    throw new Error("package.json does not contain '.license' property");
  }

  async render() {
    const packageJson = await this.validate(await this.fetch());
    return {
      message: packageJson.license,
      messageColor: "blue",
    };
  }
}

class PackageJsonVersion extends BaseAction {
  get label() {
    return "version";
  }

  async fetch() {
    return JSON.parse(await fs.readFile("./package.json", "utf8"));
  }

  async validate(packageJson) {
    if (packageJson.version) {
      return packageJson;
    }
    throw new Error("package.json does not contain '.version' property");
  }

  async render() {
    const packageJson = await this.validate(await this.fetch());
    return {
      message: addv(packageJson.version),
      messageColor: semverVersionColor(packageJson.version),
    };
  }
}

class PackageJsonNodeVersion extends BaseAction {
  get label() {
    return "node";
  }

  async fetch() {
    return JSON.parse(await fs.readFile("./package.json", "utf8"));
  }

  async validate(packageJson) {
    if (packageJson.engines && packageJson.engines.node) {
      return packageJson;
    }
    throw new Error("package.json does not contain '.engines.node' property");
  }

  async render() {
    const packageJson = await this.validate(await this.fetch());
    return {
      message: packageJson.engines.node.replace(/\s/g, ""),
      messageColor: "blue",
    };
  }
}

function fail(message) {
  core.setFailed(message);
  throw new Error(message);
}

function getAction() {
  const integration = core.getInput("integration", { required: true });
  const validIntegrations = {
    license: PackageJsonLicense,
    "node-version": PackageJsonNodeVersion,
    version: PackageJsonVersion,
  };
  if (integration in validIntegrations) {
    return validIntegrations[integration];
  }
  fail(`integration must be one of (${Object.keys(validIntegrations)})`);
}

export {
  PackageJsonLicense,
  PackageJsonNodeVersion,
  PackageJsonVersion,
  getAction,
};
