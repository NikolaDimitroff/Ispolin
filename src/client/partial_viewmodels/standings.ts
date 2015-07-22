/// <reference path="../../../typings/knockout/knockout.d.ts" />
/// <reference path="../../common/models.ts" />
/// <reference path="../utils.ts" />

type IUser = Models.IUser;
module PartialViewmodels {
    "use strict";

    interface IUserGrade {
        name: string;
        totalGrade: number;
    }

    export class Standings {
        public standings: KnockoutObservableArray<IUserGrade>;

        constructor() {
            this.standings = ko.observableArray<IUserGrade>();
            this.init();
        }

        private init(): void {
            let initializeBindings = (users: IUser[]) => {
                for (let user of users) {
                    this.standings.push({
                        name: user.name,
                        totalGrade: user.totalGrade
                    });
                }
            };
            Utils.loadJSON("/api/users", "GET")
                 .done(initializeBindings);
        }
    }
}